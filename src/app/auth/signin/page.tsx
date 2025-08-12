"use client"
import { useRouter } from "next/navigation";
import z from "zod";
import { redirect } from "next/navigation";
import {signIn} from "next-auth/react"
import { useSession } from "next-auth/react";



const signinSchema = z.object({
  name:z.string(),
  email:z.string(),
  password:z.string()
})


export default function SigninPage(){
  const router = useRouter();
  const session = useSession();
    if(session.status === "authenticated"){
      redirect("/pages/Dashboard")
    }

  const inputStyles = "border-2 outline-none rounded-md focus:ring-2 focus:blue-400"
  async function handleSubmit(formData:FormData){
    const name = formData.get("name");
    const email  = formData.get("email");
    const password = formData.get("password")

    const result = signinSchema.safeParse({
      email:email,
      name:name,
      password:password
    })

    if(!result.success){
      alert("Please validate and fill all the fields")
      return 
    }

    const res =await signIn("credentials",{
      email: result.data.email,
      password:result.data.password,
      redirect:false
    })

    if(res?.ok){
      alert("Sign In Done")
      router.push("../../pages/Dashboard");
    }else{
      alert("Invalid creds")
    }

    
  
  }

  return  <div className="h-screen bg-slate-200 flex justify-center">
    <form className="h-[25%] w-[25%] bg-white text-black" action={(e)=>handleSubmit(e)}>
      <h1>Sign In</h1>
      <input className={inputStyles} name="name"/>
      <input className={inputStyles} name="email"/>
      <input className={inputStyles} name="password"/>
      <button className="rounded-md bg-red-400 hover:bg-red-200">Submit</button>

    </form>
  </div>


}

