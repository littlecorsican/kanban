import { useRef, useEffect, useState } from "react";
import {
    useQuery,
} from 'react-query';
import useModal from "../hooks/useModal";
import '../css/projects.css'
import { Oval } from "react-loader-spinner";
import { base } from '../constants'

export default function Projects() {

    const { data:projects, isError:isProjectsError, error:projectError, isLoading:isProjectLoading } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            const res = await fetch(`${base}/api/project`);
            return res.json();
        }
    });

    return (

        <div className="flex p-8 w-full">
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass="justify-center z-50 m-auto fixed w-full h-full items-center"
                visible={isProjectLoading}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
                <div className="flex flex-col w-full">
                    {
                        !isProjectLoading && !isProjectsError && projects && projects.map((value:any, index:number)=>{
                            return <a href={`/project/${value.id}`} key={index}><div className="project-item">
                                <div>Title: {value.title}</div>
                                <div>Description: {value.description}</div>
                                <div>Managed by: {value.user.name}</div>
                            </div></a>
                        })
                    }
                </div>
            </div>
    );
};
