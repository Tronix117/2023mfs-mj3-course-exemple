interface User300 {
  id: string;
  pseudo: string;
}

async function findInDatabase(id: string): Promise<User300> {
  return { id, pseudo: 'sdfsd' };
}

// Data = User
type Data = Awaited<ReturnType<typeof findInDatabase>>;
