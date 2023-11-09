import { useRef, useEffect, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from 'react-query';
import { useParams } from "react-router-dom";
import useModal from "../hooks/useModal";
// import { useQuery } from "@tanstack/react-query";
import Draggable from '../components/Draggable';
import Droppable from '../components/Droppable';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import { Oval } from "react-loader-spinner";
  import Column from '../components/KanbanColumn'
  import { Types } from '../enum/types'
  import { changeStatus } from '../hooks/useChangeStatus'
  import { useMutation } from 'react-query';
  import { base } from '../constants'

  const queryClient = new QueryClient();

export default function Project() {

    const [openModalData, setOpenModalData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams();
    const keyboardSensor = useSensor(KeyboardSensor)
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
          distance: 10,
        },
      });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },
      });
    const sensors = useSensors(
        mouseSensor,
        keyboardSensor,
        touchSensor
    );
    const headerColour: Record<number, string> = {
        1 : "#3842CD",
        2 : "#E8DB67",
        3 : "#67E878",
        4 : "#E8679B" , 
        5 : "#66FFFF"    
    }

    const { data:project, isError:isProjectsError, error:projectError, isLoading:isProjectLoading, refetch } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            //console.log("id", id)
            const res = await fetch(`${base}/api/project/${id}`);
            return res.json();
        }
    });

    const { data:statuses, isError:isStatusError, error:statusError, isLoading:isStatusLoading } = useQuery({ 
        queryKey: ['statuses'],
        queryFn: async() => {
            const res = await fetch(`${base}/api/status`);
            return res.json();
        }
    });

    // useEffect(()=>{
    //     console.log("project", project, typeof project)
    // }, [project])
    // useEffect(()=>{
    //     console.log("statuses", statuses)
    // }, [statuses])
    // useEffect(()=>{
    //     console.log("columns", columns)
    // }, [statuses])

    const columns = isStatusError || isStatusLoading || isProjectsError || isProjectLoading ? null : project.task.reduce((prev:any, value:any)=>{
        const { status } = value
        if (typeof status == "number") {
            //console.log("prev", prev)
            if (status in prev) {
                prev[status] = [...prev[status], value] 
                return prev
            } 
            prev[status] = [value]
        }
        return prev
    }, {})


    async function handleDragEnd(e:DragEndEvent) {
        setLoading(true)
        console.log("handleDragEnd",e.over, e.active)
        const cardToMove = e.active.id
        const columnToMove = e?.over?.id
        if (columnToMove) {
            const result = await changeStatus(cardToMove, columnToMove);
            console.log(result)
            refetch()
        }

        setLoading(false)
    }
    
    const { openModal, Modal } = useModal();

    return (
        // <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        //     <Droppable id="droppable">
        //             <div className="border-2 border-black rounded p-2 inline-block ">
        //                 <img src="/images/5207497.png" style={{ width:"80px", height:"80px" }} />
        //             </div>
        //         </Droppable>
        // </DndContext>
        <div className="flex p-8">
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass="justify-center z-50 m-auto fixed w-full h-full items-center"
                visible={isStatusLoading||isProjectLoading||loading}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
                <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    <div className="flex space-x-4 bg-gray-100 p-10">
                        {
                            isStatusLoading||isProjectLoading ? 'Loading....' : isProjectsError||isStatusError ? "Error...." :                             
                            statuses && statuses.map((value:any,index:number)=>{
                                //console.log("value", value)
                                const column = columns[value.id]
                                return <Column 
                                key={value.id} 
                                title={value.title}
                                description={value.description} 
                                columnProps={value}
                                cardData={column} 
                                headerColour={headerColour[value.id]}
                                CardContent={CardContent}
                                openModal={(id:number)=>{
                                    const data = project.task.find((value: any)=>{
                                        return value.id == id
                                    })
                                    setOpenModalData(data)
                                    openModal()
                                }}
                            />
                            })
                        }
                    </div>
                </DndContext>
                <Modal>
                    <div className="absolute">
                        <div className="p-2" >Title: {openModalData?.title}</div>
                        <div className="p-2" >Description: {openModalData?.description}</div>
                        <div className="p-2" >Type: {openModalData?.type}</div>

                    </div>
                </Modal>
            </div>
    );
};


const CardContent=(props: any)=> {
    const { description, title, type } = props

    return <div 
        className="bg-gray-200 rounded-md p-2 mb-2 shadow-md relative"
        >
            <div className="">
                <div className="p-2" >Title: {title}</div>
                <div className="p-2" >Description: {description}</div>
                <div className="p-2" >Type: {type}</div>
            </div>
    </div>
}