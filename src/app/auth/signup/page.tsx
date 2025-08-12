"use client";
import axios from "axios"
import z from "zod";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";



const signupSchema = z.object({
  name:z.string(),
  email:z.string(),
  password:z.string()
})


export default function SignupPage(){
  const session = useSession();
  if(session.status === "authenticated"){
    redirect("/pages/Dashboard")
  }
  const inputStyles = "border-2 outline-none rounded-md focus:ring-2 focus:blue-400"
  async function handleSubmit(formData:FormData){
    const name = formData.get("name");
    const email  = formData.get("email");
    const password = formData.get("password")

    const result = signupSchema.safeParse({
      email:email,
      name:name,
      password:password
    })

    if(!result.success){
      alert("Please validate and fill all the fields")
      return 
    }

    const message =await axios.post("/api/auth/register",{
        email:email,
        name:name,
        password:password
      
    })

    const res = await message.data;
    if(res === "Exists"){
      alert("User aldready exists")
      redirect("../signin")
    }else{
      alert("User created")
      redirect("../../pages/Dashboard")
    }
  
  }

  return  <div className="h-screen bg-slate-200 flex justify-center">
    <form className="h-[25%] w-[25%] bg-white text-black" action={handleSubmit}>
      <h1>Sign UP</h1>
      <input className={inputStyles} name="name"/>
      <input className={inputStyles} name="email"/>
      <input className={inputStyles} name="password"/>
      <button className="rounded-md bg-red-400 hover:bg-red-200">Submit</button>

    </form>
  </div>


}

