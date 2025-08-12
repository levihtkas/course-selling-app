import { getServerSession } from "next-auth";

import { authOptions,prisma } from "../auth/[...nextauth]/route";
import { NextResponse,NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'


export async function POST(req:Request){
  const session = await getServerSession(authOptions);
  if(!session) return NextResponse.json({message:"Log In"},{status:401})
  const {course_id} = await req.json();
  const cartItem = await prisma.cart.create({
    data:{
      userId:session.user.id,
      courseId:course_id
    }
  })
  return NextResponse.json(cartItem, { status: 201 });

}