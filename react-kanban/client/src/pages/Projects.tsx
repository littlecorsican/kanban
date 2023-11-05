import { useRef, useEffect, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from 'react-query';
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
  const queryClient = new QueryClient();

export default function Projects() {

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
    const headerColour: Record<string, string> = {
        1 : "#3842CD",
        2 : "#E8DB67",
        3 : "#67E878",
        4 : "#E8679B" , 
        5 : "#66FFFF"    
    }

    const { data:projects, isError:isProjectsError, error:projectError, isLoading:isProjectLoading } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            const res = await fetch("/projects");
            return res.json();
        }
    });

    const { data:statuses, isError:isStatusError, error:statusError, isLoading:isStatusLoading } = useQuery({ 
        queryKey: ['projects'],
        queryFn: async() => {
            const res = await fetch("/statuses");
            return res.json();
        }
    });

    const columns = isStatusError || isStatusLoading || isProjectsError || isProjectLoading ? null : projects.reduce((prev, value)=>{
        const { status } = value
        if (typeof status == "number") {
            if (status in prev) {
                prev[status] = [...prev[status], value] 
                return prev
            } 
            prev[status] = [value]
        }
        return prev
    }, {})

    function handleDragEnd(e:DragEndEvent) {
        console.log("handleDragEnd",e)
        if (e.over) {

        }
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
                visible={isLoading}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
                <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    <div className="flex space-x-4 bg-gray-100 p-10">
                        {
                            isStatusLoading||isProjectLoading ? 'Loading....' : isProjectsError||isStatusError ? "Error...." :                             
                            columns && columns.map((value:any,index:number)=>{
                                return <Column 
                                key={value.id} 
                                title={value.title}
                                description={value.description} 
                                // columnProps={value}
                                cardData={value.tasks} 
                                // headerColour={headerColour[value.id]}
                                // CardContent={CardContent}
                                openModal={(id:number)=>{

                                }}
                            />
                            })
                        }
                    </div>
                </DndContext>
                <Modal>
                    <div className="absolute">
                        this is modal
                    </div>
                </Modal>
            </div>
    );
};
