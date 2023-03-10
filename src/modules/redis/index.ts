import type { IncomingMessage, ServerResponse } from 'http';
import { createServer } from 'http';

import Redis from 'ioredis';

enum Role {
  CanReadAllArticles = 'CanReadAllArticles',
  CanReadOwnArticle = 'CanReadOwnArticle',
  CanWriteArticle = 'CanWriteArticle',
}

interface User {
  id: string;
  pseudo: string;
  groupId: string;
}

interface Group {
  id: string;
  name: string;
  roles: Role[];
}

interface Article {
  id: string;
  title: string;
  content: string;
  ownerId: string;
}

// On simule une BDD
const groupCollections: Group[] = [
  {
    id: 'aaaa',
    name: 'Admins',
    roles: [Role.CanReadAllArticles, Role.CanReadOwnArticle, Role.CanWriteArticle],
  },
  {
    id: 'bbbb',
    name: 'Editorial',
    roles: [Role.CanReadOwnArticle, Role.CanWriteArticle],
  },
];
const userCollections: User[] = [{ id: 'uuuu', pseudo: 'Jeremy', groupId: 'uuuu' }];
const articleCollections: Article[] = [
  { id: 'a1', title: 'Hello', content: 'World aaa !', ownerId: 'aaaa' },
  { id: 'a2', title: 'Hello', content: 'World bbb !', ownerId: 'bbbb' },
  { id: 'a3', title: 'Hello', content: 'Jeremy !', ownerId: 'uuuu' },
  { id: 'a3', title: 'Mon Article 2', content: 'Coucou', ownerId: 'uuuu' },
];

// Annuaire des clé, permet de tracer tout ce qui est ou peut être stocké sur Redis
const RedisKey = {
  NbQuery: 'nbQuery',
  HasRole: (userId: string, role: string) => `user:${userId}:hasRole:${role}`,
};

const redis = new Redis();

async function getAndSetNbQuery() {
  // NON Atomique
  // -> Concurrence ici, si plusieurs requêtes arrivent en même temps,
  //    toutes ne compteront pas forcément car plusieurs opérations ici
  // const nbQuery: string | null = await redis.get(RedisKey.NbQueryKey);
  // const newNbQuery = +(nbQuery ?? 0) + 1;
  // await redis.set(RedisKey.NbQueryKey, newNbQuery);

  // Atomique, on résoud la concurrence
  return redis.incr(RedisKey.NbQuery);
}

async function handleRequestAsync(req: IncomingMessage, res: ServerResponse) {
  const user = userCollections.find((u) => u.id === req.headers['x-userid']); // on simule un chargement de user en bdd

  if (!user) throw new Error('Forbidden');

  if (req.url === '/articles') {
    if (await checkUserAccess(user, Role.CanReadAllArticles)) {
      return articleCollections;
    } else if (await checkUserAccess(user, Role.CanReadOwnArticle)) {
      return articleCollections.filter((a) => a.ownerId === user.id);
    } else {
      throw new Error('Unauthorized');
    }
  }

  return { newNbQuer: await getAndSetNbQuery() };
}

async function checkUserAccess(user: User, role: Role) {
  const key = RedisKey.HasRole(user.id, role);
  let hasRole: null | string = await redis.get(key);

  if (hasRole === null) {
    const group = groupCollections.find((g) => g.id === user.groupId); // simule un chargement bdd
    hasRole = group?.roles.includes(role) ? '1' : '0';
    await redis.set(key, hasRole, 'EX', 86400); // au bout d'une journée on clean la valeur
  }

  return hasRole === '1';
}

function handleRequest(req: IncomingMessage, res: ServerResponse) {
  handleRequestAsync(req, res)
    .then((data) => {
      res.statusCode = 200;
      res.end(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end(`ERROR: ${err}`);
    });
}

export default function () {
  createServer(handleRequest).listen(3000);
}
