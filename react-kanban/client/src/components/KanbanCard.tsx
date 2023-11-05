import { ReactNode, ReactElement } from "react";
import {useDraggable,} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

type Props = {
  children: ReactElement
  id: number
  openModal: (id: number) => void
}

const KanBanCard = ({children, id, openModal}:Props) => {

  return (
    <Draggable id={id}>
      <div onClick={()=>openModal(id)}>{children}</div>
    </Draggable>
  );
};

export default KanBanCard;

export interface DraggableProp {
  id: number
  children: ReactNode
}

function Draggable(props:DraggableProp) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
  