import Image from "next/image";
import Button from "./Button";
import { authOptions, prisma } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface Course {
  creator: string
  title:string
  Img: string
  course_id:string
}


export default async function CourseCard(props:Course){
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not logged in");


  async function AddtoCartSubmit(){
    try{
      const res = await axios.post("/api/cart",{
        courseId:props.course_id
      })
      console.log("Added to the cart")
    } catch(e) {
      console.log(e)
    }
  }
  

  return <div className="bg-white rounded-lg cursor-pointer shadow m-14 p-4 w-[250px] hover:shadow-lg transition">
    <div className="relative w-full h-40 mb-3 font-black ">
      <Image 
      src = {props.Img}
      alt={props.title}
      fill
      className="object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold ">{props.title}</h3>
    <p className="text-sm text-gray-500"> By {props.creator}</p>

    <Button label="Add to card" onClick={()=>{AddtoCartSubmit()}}
    ></Button>
    {/* <form action={AddtoCartSubmit}>
      <input />

    </form> */}


  </div>
}