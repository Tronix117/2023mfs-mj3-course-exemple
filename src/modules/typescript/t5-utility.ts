import type { ReadonlyKeys } from 'ts-essentials';

type Address = { city: string; zipcode: number; street: string };

interface User100 {
  id: number;
  readonly pseudo: string;
  age: number;
  readonly email: string;
  address: Address & { appartment: number };
}

const t5ab: User100 = { pseudo: 'sfgddsgf', age: 453, email: 'toto' };
t5ab.age = 43;
// t5ab.pseudo = 'tata';

function getFormattedAddress(address: Address): string {
  return address.city;
}

// Si le paramètre est fortement lié au User
function getUserFormattedAddress(address: User['address']): string {
  return `${address.appartment} ${address.city}`;
}

function getUserById(id: User['id']): undefined {
  return;
}

// --- Utility Types
type UserUpdateRequest = Partial<User>;
type UserData = Readonly<User>;
type UserIdentifier = Pick<User, 'email' | 'pseudo'>;

type rokeys = ReadonlyKeys<User>;
type UserUpdatable = Omit<User, ReadonlyKeys<User>>;
