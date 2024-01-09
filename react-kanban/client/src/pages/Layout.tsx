import { useRef, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import '../css/layout.css';
import { useNavigate } from "react-router-dom";

export default function Layout({  }) {

  const navigate = useNavigate();

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

  const logout=()=>{
    localStorage.removeItem("user_credentials")
    navigate("/login")
  }

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
          <div className="text-center">
            <button className="nav_item" onClick={logout}>Logout</button>
          </div>
        </nav>
        <div className="w-full">
          <Outlet />
        </div>
    </div>
  );
};
