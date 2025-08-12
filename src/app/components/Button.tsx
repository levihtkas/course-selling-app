"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

interface ButtonProps {
  label:string
  onClick?:()=>void
}

const Button = ({label,onClick}:ButtonProps) => {
  const handleClick = onClick ?? (()=>{signOut()})
  return (
    <button className="rounded-lg bg-red-400 hover:bg-red-200 text-lg p-2" onClick={()=>{handleClick}}>{label}</button>

  )
}

export default Button