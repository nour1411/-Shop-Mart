import React from 'react'
import { LoginForm } from './_components/LoginForm/LoginForm'


export default function Login() {
  return <>
 
   <div className="flex flex-col gap-6 min-h-[70vh] justify-center items-center">
     <h1 className="text-3xl font-bold ">
      Welcome Back
     </h1>

       <LoginForm/>
   </div>
  
  
  </>
}
