class Entity1 {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class Entity2 {
  constructor(public id: string) {}
}

// Entity1 et Entity2 font la même chose

// valeur par défaut
class Entity3 {
  public id = 'par defaut';
}

// Null quand pas assigné
class Entity4 {
  public id: string | null = null;
}

// Optionnel
class Entity5 {
  public id?: string;
}

interface UserDto {
  id: string;
  username: string;
  age?: number;
}

// On force à considérer que id sera défini, lors de l'utilisation de Entity6
// -> pas recommandé
class Entity6 {
  public id!: string;

  constructor(params: UserDto) {
    // Pick<Entity6, NonFunctionKeys<Entity6>>) {
    Object.assign(this, params);
    // this.id = params.id;
    // this.username = params.username;
    // this.age = params.age;
  }

  toJSON() {
    return {};
  }
}

class User6 extends Entity6 {
  public username!: string;
  public age?: number;
}

// ---- EX7

// Classe générique
abstract class Entity7<T extends object> {
  constructor(public data: T) {}

  findById(id: string) {
    //
  }
}

// Module user
interface UserDto2 {
  id: string;
  username: string;
  age?: number;
  save: string;
}
class User7 extends Entity7<UserDto2> {}

// Module article
interface ArticleDto {
  id: string;
  title: string;
}
class Article7 extends Entity7<ArticleDto> {}

// Execution
const user7 = new User7({ id: 'sefdldfff', username: 'dsfdsfdsf' });
user7.data.username;

const article7 = new Article7({ id: 'sdfdf', title: 'Hello world' });
article7.data.title;
// --------

export function t7Class() {
  const entity6 = new User6({
    id: 'tlaisdgfj',
    username: 'sgfjsafdklj',
    age: 34,
  });

  console.log(entity6.id);

  const entity = new Entity2('lsdfgk');
  console.log('clog entity.id', entity.id);
}
