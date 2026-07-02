import { z } from "zod";

export const UserScheme = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const validateUser = (input) => {
  return UserScheme.safeParse(input);
};

export const validateUserPartial = (input) => {
  return UserScheme.partial().safeParse(input);
};
