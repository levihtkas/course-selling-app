"use client"
import CourseCardClient from "./CourseCardClient";
import SessionProviderWrapper from "../providers/SessionProviderWrapper";

interface Course {
  creator: string
  title:string
  Img: string
  course_id:string
}


export default function CourseCard(props:Course){
  


  

  return <SessionProviderWrapper>
    <CourseCardClient Img={props.Img} title={props.title} creator={props.creator} course_id={props.course_id}/>
  </SessionProviderWrapper> 
}