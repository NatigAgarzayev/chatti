'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Draggable } from "react-beautiful-dnd"
import deleteIcon from "../images/delete.svg"
import { deleteTask } from '@/api/kanbanClient';
import { useRouter } from 'next/navigation';
import { Parser as HtmlToReactParser } from 'html-to-react';
import classes from "../styles/quill-styles.module.css"

export default function KanbanCard({ cardInfo, index }: { cardInfo: any, index: number }) {

    const [visible, setVisible] = useState(false)

    const router = useRouter()

    const htmlToReactParser = HtmlToReactParser()
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
                (provided: any) => (
                    <div className='relative flex-1 rounded-3xl mb-4 p-4 bg-indigo-200' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} draggable={true}>
                        <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='flex justify-between'>
                            <div className={`${classes.formattedText} flex-95`}>{htmlToReactParser.parse(cardInfo?.content)}</div>
                            {
                                visible &&
                                <Image className='cursor-pointer absolute right-5 top-5' onClick={deleteTaskHandler} src={deleteIcon} width={16} height={16} alt='' />
                            }
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}
