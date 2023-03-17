type UpdateUserDto = {
  pseudo: string;
  age: number;
} & ({ email: string; username?: never } | { username: string; email?: never });

interface UpdateUserDto2Base {
  pseudo: string;
  age: number;
}

interface UpdateUserDto2WithEmail extends UpdateUserDto2Base {
  email: string;
}
interface UpdateUserDto2WithUsername extends UpdateUserDto2Base {
  username: string;
}

type UpdateUserDto2 = UpdateUserDto2WithEmail | UpdateUserDto2WithUsername;

const payload: UpdateUserDto = {
  pseudo: 'toto',
  age: 34,
  email: 'srgfdfds',
  // username: 'srgfdfds',
};

console.log(payload);
