import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const prisma = new PrismaClient();

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials:{
        email: {label:"email",type:"text",placeholder:"Sakthi"},
        password:{label:"Password",type:"password",placeholder:"Password"}

      },
      async authorize(credentials) {
        
        const email = credentials?.email;
        const password = credentials?.password;
        if(!email || !password){
          return null
        }
        const user  = await prisma.user.findFirst({
          where : {
            email:email
          }
        });
        if(!user){
          return null
        }
        const isPassword = await bcrypt.compare(password!,user.password);
        if(isPassword){
          return {
            id:user.id,
            email:user.email,
            name:user.name,
          }
        }else{
          return null
        }

       
      },
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id=user.id;
        token.name=user.name;
      }
      return token;
    },
    async session({session,token}){
      if(token && session.user){
        session.user.id = token.id as string;
        session.user.name = token.name;
      }
      return session
    }

  },
  pages:{
    signIn:"../../../auth/signin"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };

