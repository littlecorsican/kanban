import { useRef, useEffect, useState, useContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
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
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'

export default function Projects() {

    const global_context = useContext(GlobalContext)
    const credentials = localStorage.getItem('user_credentials')
    let access_token = ""
    if (credentials) {
        access_token = JSON.parse(credentials).access_token
    }

    const { data:projects, isError:isProjectsError, error:projectError, isLoading:isProjectLoading, refetch:refetchProjects } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            global_context.setLoading(true)
            const res:any = await request(`${base}/api/project`, "GET", )
            global_context.setLoading(false)
            return res
        }
    });

    const { data:users, isError:isUserError, error:userError, isLoading:isUserLoading, refetch:reFetchUsers } = useQuery({ 
        queryKey: ['users'],
        enabled: false,
        queryFn: async() => {
            global_context.setLoading(true)
            const res:any = await request(`${base}/api/user`, "GET", )
            let namelist = res
            global_context.setLoading(false)
            namelist = namelist.map((value: { id:number, name:string })=>{
                return { id:value.id, title:value.name }
            });
            console.log(namelist)
            return namelist
        },
    });

    const { openModal:openCreateNewModal, Modal:CreateNewModal, closeModal:closeCreateNewModal } = useModal();

    const deleteProject=async(id:number)=>{
        global_context.setLoading(true)
        const response:any = await request(`${base}/api/project/${id}`, "DELETE", )
        // const response = await fetch(`${base}/api/project/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
                
        //     },
        // });
        if (!response.success) {
            toast("Error deleting..")
        } else {
            toast("Succesfully deleted")
        }
        refetchProjects()
        global_context.setLoading(false)
    }

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
                }}
                className="text-center text-slate-800 border-slate-600 rounded border px-4 py-6 hover:bg-slate-700 hover:text-slate-100"
                >Create New Project</button>
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
                            return <div key={index} className="flex flex-row project-outline">
                                <div style={{ flex:15 }}>
                                    <a href={`/project/${value.id}`} >
                                        <div className="project-item">
                                            <ProjectItem title="Title:" value={value.title} />
                                            <ProjectItem title="Description:" value={value.description} />
                                            <ProjectItem title="Managed By:" value={value.user.name} />
                                        </div>
                                    </a>
                                </div>
                                <div style={{ flex:1 }} className="text-center">
                                    <button className="text-xl delete-button" onClick={()=>deleteProject(value.id)}>x</button>
                                </div>
                            </div>
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


function ProjectItem(props: {title: string, value: string}) {
    return <div className="flex">
        <div className="text-style-1 basis-1/4">{props.title}</div> 
        <div className="text-style-2 basis-1/2">{props.value}</div> 
    </div>
}