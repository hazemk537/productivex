"use client";
import Link from "next/link";

export default function Home() {
  const projectsArr=[
    {
      name: "Main",
      path: "/home/hard/mi9liteSync_source/openContacts/productiveX/main",
      id: 0,
    },
    {
      name: "Business",
      path: "/home/hard/mi9liteSync_source/openContacts/productiveX/business",
      id: 1,
    },
  ]
  return (
    <>
      {projectsArr.map((item) => {
        return (
          // #NOte clossures
          <Link href={{ pathname: '/tables', query: { folder: `${item.path}` } }} key={item.id}>
         <span>{item.name}</span>
          </Link>
        );
      })}


      {/* #todo_0 learn design course */}

    </>
  );
}
