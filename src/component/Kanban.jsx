import {React, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import kanbanData from '../kanbanData';



const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: "4",
  width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#bee0ec",

  // styles we need to apply on draggables
  ...draggableStyle
});


export default function Kanban() {
  const [data, setData] = useState(kanbanData)
 
  
  function handleDrageEnd (result)
  { 
    if (!result.destination) return;
    const {source, destination} = result;
    const sourceColumn = result.source.droppableId
    const destColumn = result.destination.droppableId
    const sourceIndex = result.source.index
    const destIndex = result.destination.index
   

   if (sourceColumn==destColumn) {
    const [movedItem] = data[sourceColumn].tasks.splice(sourceIndex ,1);
    data[sourceColumn].tasks.splice(destIndex ,0, movedItem);     

   }
   else {
    const [movedItem] = data[sourceColumn].tasks.splice(sourceIndex ,1);
    data[destColumn].tasks.splice(destIndex ,0, movedItem);     
   }   
  }


  return (
    <>
     <DragDropContext onDragEnd={handleDrageEnd} >
        {data?.map ((section, idx) => (
          <Droppable key={section.id} droppableId={section.id} isCombineEnabled>
            {(provided,snapshot) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}>
                <h2>{section?.title}</h2>
                {section?.tasks.map((task,index)=>
                    <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                            <div 
                              ref={provided.innerRef} 
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps } 
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                              {task.title}
                            </div>
                          )}
                    </Draggable>             
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>       
        ))}
      
     </DragDropContext>
    </>
  )
}
