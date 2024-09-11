'use client'
import React from 'react'
import { Droppable } from "react-beautiful-dnd"
import KanbanCard from './KanbanCard';
export default function KanbanBoard({ loading, dropId, innerItems }: { loading?: boolean, dropId: string, innerItems: any[] }) {
    return (
        <Droppable
            droppableId={dropId}
        >
            {
                (provided: any) => (
                    <div className={`${loading && "animate-pulse"} bg-gray-100 dark:bg-gray-800 h-full p-4 rounded-3xl overflow-hidden overflow-y-auto`} ref={provided.innerRef} {...provided.droppableProps}>
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
