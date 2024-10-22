import { z } from "zod";

export const UserSchemaVerfication = z.object({
  username: z
    .string()
    .max(12, { message: "Username must be 12 Character" })
    .min(3, { message: "Username must be minimum 3 character " })
    .regex(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
      message: "Username must end with a number or symbol",
    }),
});
