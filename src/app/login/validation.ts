//- src/app/login/validation.ts

import z from "zod"

const minChar = 3;

export const LoginFormSchema = z.object({
  email: z.email().min(minChar, "Email address min. 3 characters"),
  password: z.string().min(minChar, "Password min. 3 characters"),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>
