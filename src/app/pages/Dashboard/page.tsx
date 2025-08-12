import { authOptions, prisma } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import CourseCard from "@/app/components/CourseCard";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import Button from "@/app/components/Button";
import CourseCarousel from "@/app/components/CourseCarousel";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin")
  }
  const courses = await prisma.course.findMany();

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* NavBar */}
      <div className="h-25 w-full bg-slate-200 flex justify-center items-center gap-10">
        <div className="mb-2 relative h-[90%] w-[10%] mt-2 ">
          <Image
            src="/images/logo.png"
            fill
            alt="Logo"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="relative h-[60%] w-[50%]">
          <input
            placeholder="Search for your courses"
            className="rounded-xl p-2 w-full h-full pr-6 bg-white text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <SearchIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        <Link
          href="/my-courses"
          className="text-blue-400 hover:text-blue-600 hover:text-xl font-semibold transition-all duration-200"
        >
          My Courses
        </Link>
        <Button label="logOut" />
      </div>

      {/* Main content */}
      <div className="bg-grey-400 flex-1 w-screen">
      <p className="text-black text-xl p-4 font-semibold">
         Welcome Pal, {session?.user?.id ?? "Guest"}
      </p>


        <div className="flex justify-center">
          <CourseCarousel
            courses={courses.map((c) => ({
              title: c.title,
              creator: c.creator,
              Img: c.thumbnail,
              course_id: c.id
            }))}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center ">
          <p className="text-sm">
            © {new Date().getFullYear()} eduWorld. All rights reserved.
          </p>
          <div className="text-sm text-gray-300">
            123 Learning Lane, Knowledge City, ED 45678 <br />
            Email: support@eduworld.com | Phone: +1 (555) 987-6543
          </div>
        </div>
      </footer>
    </div>
  );
}
