//- src/app/register/validation.ts

import z from "zod"

const minChar = 3;

export const RegisterFormSchema = z.object({
  name: z.string().min(minChar, "Nama minimal 3 karakter"),
  email: z.email().min(minChar, "Email minimal 3 karakter"),
  password: z.string().min(minChar, "Kata sandi minimal 3 karakter"),
  repassword: z.string().min(minChar, "Ulangi kata sandi minimal 3 karakter"),
}).refine((data) => data.password === data.repassword, {
  message: "Kata sandi dan ulangi kata sandi tidak cocok",
  path: ["repassword"],
})

export type RegisterFormData = z.infer<typeof RegisterFormSchema>
