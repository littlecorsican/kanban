import { useRef, useEffect, useState } from "react";
import {
    useQuery,
} from 'react-query';
import useModal from "../hooks/useModal";
import '../css/projects.css'
import { Oval } from "react-loader-spinner";
import { base } from '../constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProject } from '../hooks/useCreateProject'
import InputText from '../components/InputText'
import TextArea from '../components/TextArea'
import DropDownMenu from '../components/DropDownMenu'

export default function Projects() {

    const { data:projects, isError:isProjectsError, error:projectError, isLoading:isProjectLoading, refetch:refetchProjects } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            const res = await fetch(`${base}/api/project`);
            return res.json();
        }
    });

    const { data:users, isError:isUserError, error:userError, isLoading:isUserLoading, refetch:reFetchUsers } = useQuery({ 
        queryKey: ['users'],
        enabled: false,
        queryFn: async() => {
            const res = await fetch(`${base}/api/user`);
            let namelist = await res.json()
            namelist = namelist.map((value: { id:number, name:string })=>{
                return { id:value.id, title:value.name }
            });
            console.log(namelist)
            return namelist
        },
    });

    const { openModal:openCreateNewModal, Modal:CreateNewModal, closeModal:closeCreateNewModal } = useModal();

    return (

        <div className="w-full">
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
            <ToastContainer/>
            <div className="block px-12 py-8">
                <button onClick={async()=>{
                    if (!users) await reFetchUsers()
                    openCreateNewModal()
                }}>Create New Project</button>
            </div>
            <div className="flex p-8 w-full">
                <div className="flex flex-col w-full">
                    {
                        !isProjectLoading && !isProjectsError && projects && projects.map((value:{
                            description: string,
                            title: string,
                            id: number,
                            user: {
                                name: string,
                            }
                        }, index:number)=>{
                            return <a href={`/project/${value.id}`} key={index}><div className="project-item">
                                <div>Title: {value.title}</div>
                                <div>Description: {value.description}</div>
                                <div>Managed by: {value.user.name}</div>
                            </div></a>
                        })
                    }
                </div>
            </div>
            <CreateNewModal>
                <div className="absolute">
                    <form onSubmit={async(e)=>{
                        const result:any = await createProject(e)
                        const errorMsg:string = result?.message
                        if (result.success) {
                            toast(errorMsg, {
                                className:"whitespace-pre-line"
                            })
                        } else {
                            toast("Task succesfully created", {
                                className:"whitespace-pre-line"
                            })
                        }
                        refetchProjects()
                        closeCreateNewModal()
                    }}>
                        <InputText id="title" label="Title" />
                        <TextArea id="description" label="Description" />
                        <DropDownMenu id="project_manager" label="Project Manager" list={users} />
                        <input type="submit" value="Create" className="cursor-pointer" />
                    </form>
                </div>
            </CreateNewModal>
        </div>
    );
};
