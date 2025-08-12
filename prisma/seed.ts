import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  const courses = await prisma.course.createMany({
    data: [
      {
        id: "course-1",
        title: "Next.js for Beginners",
        description: "Learn to build modern web applications using Next.js",
        price: 49.99,
        creator:"Sakthi",
        thumbnail: "/images/nextI.jpg"
      },
      {
        id: "course-2",
        title: "Fullstack Prisma with PostgreSQL",
        creator:"Jilabi lady",
        description: "Master Prisma ORM and PostgreSQL integration",
        price: 39.99,
        thumbnail: "/images/nextI.jpg"
      },
      {
        id: "course-3",
        title: "React Mastery Bootcamp",
        description: "Become a React expert from scratch",
        price: 59.99,
        creator:"Monica",
        thumbnail: "/images/nextI.jpg"
      },
      {
        id: "course-4",
        title: "TypeScript in Depth",
        description: "Type-safe your entire JavaScript stack",
        price: 29.99,
        creator:"anirudh",
        thumbnail: "/images/nextI.jpg"
      }
    ]
  });

  // Add videos for each course
  await prisma.video.createMany({
    data: [
      {
        courseId: "course-1",
        title: "Intro to Next.js",
        url: "https://www.youtube.com/watch?v=1WmNXEVia8I"
      },
      {
        courseId: "course-1",
        title: "Pages & Routing",
        url: "https://www.youtube.com/watch?v=IkOVe40Sy0U"
      },
      {
        courseId: "course-2",
        title: "Prisma Setup",
        url: "https://www.youtube.com/watch?v=RebA5J-rlwg"
      },
      {
        courseId: "course-2",
        title: "Connecting with PostgreSQL",
        url: "https://www.youtube.com/watch?v=5zI3eaQf0K8"
      },
      {
        courseId: "course-3",
        title: "JSX & Components",
        url: "https://www.youtube.com/watch?v=bMknfKXIFA8"
      },
      {
        courseId: "course-3",
        title: "State Management",
        url: "https://www.youtube.com/watch?v=35lXWvCuM8o"
      },
      {
        courseId: "course-4",
        title: "Understanding Types",
        url: "https://www.youtube.com/watch?v=ahCwqrYpIuM"
      },
      {
        courseId: "course-4",
        title: "Generics in TS",
        url: "https://www.youtube.com/watch?v=pN6jk0uUrD8"
      }
    ]
  });

  console.log("Seeded 4 courses with 2 videos each.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
