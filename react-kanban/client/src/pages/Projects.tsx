import { useRef, useEffect, useState } from "react";
import {
    useQuery,
} from 'react-query';
import useModal from "../hooks/useModal";

  import { Oval } from "react-loader-spinner";


export default function Projects() {

    const { data:projects, isError:isProjectsError, error:projectError, isLoading:isProjectLoading } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            const res = await fetch("http://localhost:8081/api/project");
            return res.json();
        }
    });

    const { openModal, Modal } = useModal();

    return (

        <div className="flex p-8">
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
                <div className="flex flex-col">
                    {
                        !isProjectLoading && !isProjectsError && projects && projects.map((value:any, index:number)=>{
                            return <a href={`/project/${value.id}`} key={index}><div className="rounded p-12">
                                <div>{value.title}</div>
                                <div>{value.description}</div>
                                <div>By: {value.user.name}</div>
                            </div></a>
                        })
                    }
                </div>
                <Modal>
                    <div className="absolute">
                        this is modal
                    </div>
                </Modal>
            </div>
    );
};
