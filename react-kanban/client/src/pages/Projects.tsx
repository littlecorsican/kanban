import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Projects() {

    const { data:projects, status, error, isLoading } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            const res = await fetch("/projects");
            return res.json();
        }
    });

    return (
    <div className="">
        
    </div>
    );
};
