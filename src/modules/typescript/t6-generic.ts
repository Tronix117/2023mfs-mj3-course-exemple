import type { ReadonlyKeys } from 'ts-essentials';

type Address = { city: string; zipcode: number; street: string };

interface User200 {
  id: number;
  readonly pseudo: string;
  age: number;
  readonly email: string;
  address: Address & { appartment: number };
}

// --- Création d'un type Générique (qui prend un paramètre)
type OnlyUpdatableFields<T extends object> = Omit<T, ReadonlyKeys<T>>;

// Utilisation du générique
type UserUpdatable = OnlyUpdatableFields<User200>;

// ----------------------------------------------
function getUpdatableFields<T>(obj: T): OnlyUpdatableFields<T> {
  // ...
}
