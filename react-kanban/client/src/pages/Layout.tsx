import { useRef, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout({  }) {

  const navItem = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Projects",
      url: "/projects"
    },
  ]

  return (
    <div className="flex ">
        <nav className="p-8 w-[20%]">
          {
            navItem.map((value,index)=>{
              return <a href={value.url} key={index}><div>{value.title}</div></a>
            })
          }
        </nav>
        <Outlet />
    </div>
  );
};
