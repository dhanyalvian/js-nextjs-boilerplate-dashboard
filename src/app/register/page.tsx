//- src/app/register/page.tsx

"use client"

import { PageCard } from "@/components/core/page/card"
import RegisterForm from "./form"

const RegisterPage = () => {
  return (
    <PageCard
      title="Daftar akun baru"
      description="Daftar sekarang untuk mulai menabung qurban secara rutin, memantau target tahunan, dan mengelola setoran dengan lebih mudah dan aman."
    >
      <RegisterForm />
    </PageCard>
  )
}

export default RegisterPage
