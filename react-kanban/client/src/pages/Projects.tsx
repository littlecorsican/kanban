import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Projects() {

    const { data, status } = useQuery("projects", async()=>{
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        return res.json();
    });

    return (
    <div className="">
        
    </div>
    );
};
