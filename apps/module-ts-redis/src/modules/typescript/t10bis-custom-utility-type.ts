/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
namespace T10bis {
  // Retourne une interface dont les clés héritées de T ne sont pas des fonctions dans T
  type PropertiesKey<T extends object> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];

  // Retourne seulement les propriété de T qui sont des propriété (donc pas des fonctions)
  type Properties<T extends object> = Pick<T, PropertiesKey<T>>;

  class Entity<T extends object> {
    id!: string;

    constructor(data: Properties<T>) {
      Object.assign(this, data);
    }

    save() {}
  }

  class User extends Entity<User> {
    username!: string;
    age?: number;
  }

  class Article extends Entity<Article> {
    title!: string;
    content!: string;
  }

  export function t10() {
    const user = new User({
      id: 'jkdfjdskfj',
      username: 'fsdujklfjd',
      age: 34,
    });

    const article = new Article({
      id: 'jkdfjdskfj',
      title: 'titi',
      content: 'hello',
    });

    console.log(user.username, article.id);
  }
}
