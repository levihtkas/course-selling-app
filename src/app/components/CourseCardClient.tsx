"use client"

import Button from "./Button"
import Image from "next/image";
import { useSession } from "next-auth/react";


interface PropInterface {
  Img:String,
  title:string,
  creator:string,
  course_id:string
}
async function AddtoCartSubmit(course_id:string){
    
  try{
    const res = await axios.post("/api/cart",{
      course_id:course_id
    })
    console.log("Added to the cart")
  } catch(e) {
    console.log(e)
  }
}
export default function CourseCardClient({Img,course_id,creator,title}:PropInterface){
  const session =  useSession();
  if (!session) throw new Error("Not logged in");
  return <div className="bg-white rounded-lg cursor-pointer shadow m-14 p-4 w-[250px] hover:shadow-lg transition">
  <div className="relative w-full h-40 mb-3 font-black ">
    <Image 
    src = {Img as string}
    alt={title}
    fill
    className="object-cover rounded-md"
    />
  </div>
  <h3 className="text-lg font-semibold ">{title}</h3>
  <p className="text-sm text-gray-500"> By {creator}</p>

   <Button label="Submit" onClick={()=>{AddtoCartSubmit(course_id)}}/>

</div>
}