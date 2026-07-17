//- src/app/login/page.tsx

"use client"

import LoginForm from "./form"
import { PageCard } from "@/components/core/page/card"

const LoginPage = () => {
  return (
    <PageCard
      title="Login to your account"
      description="Enter your username and password below to login to your account"
    >
      <LoginForm />
    </PageCard>
  )
}

export default LoginPage
