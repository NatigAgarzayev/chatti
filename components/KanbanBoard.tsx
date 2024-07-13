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
                (provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; droppableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; placeholder: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }) => (
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
