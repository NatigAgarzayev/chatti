'use client'
import React from 'react'
import { Droppable } from "react-beautiful-dnd"
import KanbanCard from './KanbanCard';
export default function KanbanBoard({ dropId, innerItems }: { dropId: string, innerItems: any[] }) {
    return (
        <Droppable
            droppableId={dropId}
        >
            {
                (provided: any) => (
                    <div className='bg-gray-100 h-full p-4 rounded-3xl ' ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            innerItems?.map((item, index) => (
                                <KanbanCard key={item.id} cardInfo={item} index={index} />
                            ))
                        }
                        {
                            provided.placeholder
                        }
                    </div>
                )
            }
        </Droppable>
    )
}
