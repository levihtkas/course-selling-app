import { prisma } from "../[...nextauth]/route";
import { NextResponse,NextRequest } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req:NextRequest){
  const {name,email,password} = await req.json();
  const existingUsers = await prisma.user.findUnique({where:{email:email}})
  if(existingUsers){
    return NextResponse.json({message:"Exists"})
  }
  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data:{
      name:name,
      email:email,
      password:hashedPassword
    }
  })

  return NextResponse.json({message:"Created"})
}