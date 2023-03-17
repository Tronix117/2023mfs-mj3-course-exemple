type UpdateUserDto = {
  pseudo: string;
  age: number;
};

function isUpdateUserDto(data: unknown): data is UpdateUserDto {
  return (
    typeof data === 'object' &&
    data !== null &&
    'pseudo' in data &&
    typeof data['pseudo'] === 'string' &&
    'age' in data &&
    typeof data['age'] === 'number'
  );
}

export function t2UnknownWithGuard() {
  // Data recue de l'extèrieur
  const body = '{ "pseudo": "toto", "age": 23 }';

  // Parse la donnée et vous l'assigner à data qui a un type précis
  const data: unknown = JSON.parse(body);

  if (!isUpdateUserDto(data)) throw new Error('Not good data');

  const pseudo = data.pseudo.toUpperCase();
  console.log(pseudo);
}
