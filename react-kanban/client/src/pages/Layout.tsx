import { useRef, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import '../css/layout.css';

export default function Layout({  }) {

  const navItem = [
    {
      title: "Home",
      url: "/",
      icon: "",
    },
    {
      title: "Projects",
      url: "/projects",
      icon: "",
    },
  ]

  return (
    <div className="flex ">
        <nav className="bg-[#282c34] w-[20%] h-[100vh] min-w-[80px] max-w-[200px]">
          <div className="nav_item">
            User <img src="" />
          </div>
          {
            navItem.map((value,index)=>{
              return <a href={value.url} key={index}>
                <div className="nav_item">
                  <div className=""><img src="" /></div>
                  <div className="">{value.title}</div>
                </div>
              </a>
            })
          }
        </nav>
        <div className="w-full">
          <Outlet />
        </div>
    </div>
  );
};
