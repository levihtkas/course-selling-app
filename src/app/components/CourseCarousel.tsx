"use client"

import {Swiper,SwiperSlide} from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css"
import CourseCard from "./CourseCard";
import "swiper/css/navigation";

type Course = {
  title:string
  creator:string
  Img:string,
  course_id:string
}

interface Props {
 
  courses:Course[]
}

export default function CourseCarousel({courses}:Props){
  return <section className="pl-10 pr-10 w-full ">
    <h2 className="text-2xl text-blue-400 font-bold  ">Explore</h2>

    <Swiper spaceBetween={20} autoplay={{delay:10000}}
    modules={[Autoplay,Navigation]}
    centeredSlides={true}
    navigation={true} 
    breakpoints={{
      640:{slidesPerView:2},
      1024:{slidesPerView:3}
    }}>
      {courses.map((course, idx) => (
        <SwiperSlide key={idx} style={{ width: "250px" }} >
          <CourseCard {...course} />
        </SwiperSlide>
      ))}

 

    </Swiper>

  </section>

}