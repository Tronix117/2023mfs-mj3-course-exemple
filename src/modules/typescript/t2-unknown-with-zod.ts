import { z } from 'zod';

const updateUserDtoSchema = z.object({
  id: z.string(),
  pseudo: z.string().optional(),
  age: z.number().optional(),
});

// type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;

export function t2UnknownWithZod() {
  // Data recue de l'extèrieur
  const body = '{ "pseudo": "toto" }';

  // Parse la donnée et vous l'assigner à data qui a un type précis
  const data: unknown = JSON.parse(body);

  const parsedData = updateUserDtoSchema.parse(data);

  const pseudo = parsedData.pseudo?.toUpperCase();
  console.log(pseudo);
}
