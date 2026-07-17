//- src/app/login/form.tsx

import { LoginData, LoginResp } from "./type"
import { useRouter, useSearchParams } from "next/navigation"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { LoginFormData, LoginFormSchema } from "./validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import {
  PageCardContent,
  PageCardContentFieldPassword,
  PageCardContentFieldText,
  PageCardFooter,
} from "@/components/core/page/card"
import { toast } from "sonner"
import { useState } from "react"

const PostLogin = async (loginData: LoginData): Promise<LoginResp> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  })

  if (!res.ok) throw new Error("Login failed")

  return res.json()
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema) as Resolver<LoginFormData>,
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isRedirecting, setIsRedirecting] = useState(false)
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: LoginData) => PostLogin(loginData),
    onSuccess: () => {
      setIsRedirecting(true)

      if (from) {
        router.push(from)
        return
      }

      router.push("/")
    },
    onError: (error: Error) => {
      console.error("Error login:", error)
      setIsRedirecting(false)
      reset()
    }
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    const toastPromise = mutateAsync(data)

    toast.promise(toastPromise, {
      loading: 'Sedang masuk ke akun...',
      success: () => {
        return "Anda berhasil masuk ke akun.";
      },
      error: () => {
        return "Gagal masuk. Silakan coba lagi."
      },
    });
  }

  const isLoading = isPending || isRedirecting

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageCardContent>
        <PageCardContentFieldText
          id="email"
          label="Email"
          type="text"
          placeholder="Email"
          errMessage={errors.email?.message || ""}
          registration={register("email")}
          isLoading={isLoading}
        />

        <PageCardContentFieldPassword
          id="password"
          label="Password"
          placeholder="Password"
          errMessage={errors.password?.message || ""}
          registration={register("password")}
          optLink="/forgot-password"
          optLabel="Forgot your password?"
          isLoading={isLoading}
        />
      </PageCardContent>

      <PageCardFooter submitLabel="Login" isLoading={isLoading} />
    </form>
  )
}

export default LoginForm
