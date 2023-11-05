import { useRef, useEffect, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from 'react-query';
  const queryClient = new QueryClient();

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
