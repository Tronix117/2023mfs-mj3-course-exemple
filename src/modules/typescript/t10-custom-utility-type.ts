/* eslint-disable @typescript-eslint/ban-types */

// Retourne une interface dont les clés héritées de T ne sont pas des fonctions dans T
type PropertiesKey<T extends object> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// Retourne seulement les propriété de T qui sont des propriété (donc pas des fonctions)
type Properties<T extends object> = Pick<T, PropertiesKey<T>>;

class User {
  id!: string;
  username!: string;
  age?: number;

  constructor(data: Properties<User>) {
    Object.assign(this, data);
  }

  save() {}
}

function t10() {
  const user = new User({
    id: 'jkdfjdskfj',
    username: 'fsdujklfjd',
    age: 34,
  });

  console.log(user.id);
}
