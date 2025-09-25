"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import {signIn} from "next-auth/react"
import { useSearchParams } from "next/navigation"
const formSchema = z.object({
  email: z.email('invalid email'),
  password: z.string().nonempty('password is required')
})

type LoginFields=z.infer<typeof formSchema>


export function LoginForm() {
   
    const searchParams =useSearchParams();

    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState(searchParams.get('error'))


      const login = useForm<LoginFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values:LoginFields ) {
     
    setIsLoading(true);
     
    const payload= await signIn("credentials",{
         email: values.email,
      password:values.password,
      callbackUrl:'/',
      redirect:true
    })
    console.log(payload);
    

    if(payload?.error){
        setApiError(payload.error)
    }


    setIsLoading(false);


  }

  return <>
  
  <Card className="p-5 w-sm">

      <Form {...login}>
      <form onSubmit={login.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={login.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={login.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {apiError&&<h2 className="text-lg text-red-500">{apiError}</h2>}
        <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading&&<Loader2 className="animate-spin"/>}
            Login</Button>
      </form>
    </Form>
  </Card>
  
  </>
}