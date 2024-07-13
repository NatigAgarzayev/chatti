'use client'
import Image from 'next/image';
import React from 'react'
import { Draggable } from "react-beautiful-dnd"
import deleteIcon from "../images/delete.svg"
import { deleteTask } from '@/api/kanbanClient';
import { useRouter } from 'next/navigation';

export default function KanbanCard({ cardInfo, index }: { cardInfo: any, index: number }) {

    const router = useRouter()

    const deleteTaskHandler = async () => {
        await deleteTask(cardInfo.id)
        router.refresh()
    }

    return (
        <Draggable
            draggableId={cardInfo.id.toString()}
            index={index}
        >
            {
                (provided: { draggableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; innerRef: React.LegacyRef<HTMLDivElement> | undefined }) => (
                    <div className='flex-1 rounded-3xl mb-4 p-4 bg-indigo-200' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} draggable={true}>
                        <div className='flex justify-between'>
                            <p className='flex-95 overflow-hidden text-ellipsiss'>{cardInfo?.content}</p>
                            <Image className='cursor-pointer' onClick={deleteTaskHandler} src={deleteIcon} width={16} height={16} alt='' />
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}
