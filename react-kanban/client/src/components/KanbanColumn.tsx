import { ReactNode } from "react";
import {useDroppable} from '@dnd-kit/core';
import KanBanCard from "./KanbanCard";

export interface ColumnProp {
  title: string,
  description: string,
  // project_manager: number,
  headerColour: string,
  cardData: any;
  columnProps: {
    id: number,
  }
  // CardContent: JSX.ElementType
  openModal: (id: number) => void
}

const KanBanColumn = (props:ColumnProp) => {

  const { id } = props.columnProps
  // const CardContent = props.CardContent

  return (
    <>
      <Droppable id={id.toString()}>
        <div className="w-[30vw] bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div>Create new card...</div>
          <div>{props.cardData.length} cards</div>
          <h2 className={`text-lg font-semibold mb-4 p-2`}
          style={{ background: props.headerColour }}>{props.title}</h2>
          {
            props.cardData.length > 0 && props.cardData.map((value:any,index:number)=>{
              //console.log('value', value)
              const { id } = value
              // return <KanBanCard 
              //     key={index}  
              //     id={id}
              //     openModal={props.openModal}
              //   >
              //     <CardContent {...value} />
              //   </KanBanCard>
              return <div>xxxx</div>
            })
          }
        </div>
      </Droppable>
    </>
  );
};

export default KanBanColumn;

export interface DroppableProp {
  id: string
  children: ReactNode
}

export function Droppable(props:DroppableProp) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}