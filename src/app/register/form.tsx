//- src/app/register/form.tsx

import { useRouter, useSearchParams } from "next/navigation"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { RegisterFormData, RegisterFormSchema } from "./validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { RegisterData, RegisterResp } from "./type"
import {
  PageCardContent,
  PageCardContentFieldPassword,
  PageCardContentFieldText,
  PageCardFooter,
} from "@/components/core/page/card"

const PostRegister = async (registerData: RegisterData): Promise<RegisterResp> => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  })

  if (!res.ok) throw new Error("Register failed")

  return res.json()
}

const RegisterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["register"],
    mutationFn: (registerData: RegisterData) => PostRegister(registerData),
    onSuccess: () => {
      if (from) {
        router.push(from)
        return
      }

      router.push("/")
    },
    onError: (error: Error) => {
      console.error("Error register:", error)
      alert("Gagal mendaftar. Silakan coba lagi.")
      reset()
    }
  })

  const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData) => {
    mutateAsync(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageCardContent>
        <PageCardContentFieldText
          id="email"
          label="Email"
          type="text"
          placeholder="Email"
          errMessage={errors["email"]?.message || ""}
          registration={register("email")}
          isLoading={isPending}
        />

        <PageCardContentFieldText
          id="name"
          label="Nama"
          type="text"
          placeholder="Nama"
          errMessage={errors["name"]?.message || ""}
          registration={register("name")}
          isLoading={isPending}
        />

        <PageCardContentFieldPassword
          id="password"
          label="Kata Sandi"
          placeholder="Kata Sandi"
          errMessage={errors["password"]?.message || ""}
          registration={register("password")}
          isLoading={isPending}
        />
        
        <PageCardContentFieldPassword
          id="repassword"
          label="Ulangi Kata Sandi"
          placeholder="Ulangi Kata Sandi"
          errMessage={errors["repassword"]?.message || ""}
          registration={register("repassword")}
          isLoading={isPending}
        />
      </PageCardContent>
      
      <PageCardFooter submitLabel="Daftar" isLoading={isPending}>
          Sudah punya akun? <Link href="/login">Masuk</Link>
      </PageCardFooter>
    </form>
  )
}

export default RegisterForm
