import { useRef, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout({  }) {

 

  return (
    <div className="flex items-center justify-center min-h-screen">
        this is layout
        <Outlet />
    </div>
  );
};
