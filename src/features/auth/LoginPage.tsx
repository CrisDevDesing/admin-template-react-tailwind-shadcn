import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "@/components/ui/form"
import { Alert } from "@/components/ui/alert" // opcional, se você tiver um componente de alerta

const schema = z.object({
  username: z.string().min(1, "Digite o usuário"),
  password: z.string().min(1, "Digite a senha"),
})

const mockUsers = [
  { username: "superadmin", password: "1234", role: "super_admin", tenantId: null },
  { username: "empresa1", password: "1234", role: "admin", tenantId: "1" },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  })
  const [errorMessage, setErrorMessage] = React.useState("")

  const onSubmit = (values: any) => {
    const user = mockUsers.find(
      (u) => u.username === values.username && u.password === values.password
    )

    if (user) {
      localStorage.setItem("token", "mock-token")
      localStorage.setItem("role", user.role)
      localStorage.setItem("tenantId", user.tenantId ?? "")

      if (user.role === "super_admin") {
        navigate("/super-admin")
      } else {
        navigate("/")
      }
    } else {
      setErrorMessage("Credenciais inválidas")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Bem-vindo</h1>
        <p className="text-center text-gray-500 mb-6">
          Faça login para acessar o sistema
        </p>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu usuário"
                      {...field}
                      autoFocus
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full py-3 text-lg font-medium">
              Entrar
            </Button>

            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Esqueci a senha
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
