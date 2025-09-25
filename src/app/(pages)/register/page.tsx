"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rePassword: z.string().min(6, "Confirm your password"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})

type RegisterFormValues = z.infer<typeof formSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setLoading(true)
    setError("")

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || "Signup failed")
    } else {
      router.push("/login")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder="Enter your name" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder="Enter your email" type="email" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <Input {...field} placeholder="Enter your phone" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input {...field} type="password" placeholder="Enter your password" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <Input {...field} type="password" placeholder="Confirm your password" />
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
