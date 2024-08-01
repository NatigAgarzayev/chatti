'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Draggable } from "react-beautiful-dnd"
import deleteIcon from "../images/delete.svg"
import { deleteTask } from '@/api/kanbanClient';
import { useRouter } from 'next/navigation';
import { Parser as HtmlToReactParser } from 'html-to-react';
import classes from "../styles/quill-styles.module.css"
import { useStore } from '@/store/store';

export default function KanbanCard({ cardInfo, index }: { cardInfo: any, index: number }) {

    const [visible, setVisible] = useState(false)

    const router = useRouter()

    const updateConfirmDeleteTaskModal = useStore(state => state.updateConfirmDeleteTaskModal)
    const updateModalId = useStore(state => state.updateModalId)

    const htmlToReactParser = HtmlToReactParser()
    const deleteTaskHandler = async () => {
        updateConfirmDeleteTaskModal(true)
        updateModalId(cardInfo.id)
        router.refresh()
    }

    return (
        <Draggable
            draggableId={cardInfo.id.toString()}
            index={index}
        >
            {
                (provided: any) => (
                    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='relative flex-1 rounded-3xl mb-4 p-4 bg-indigo-200' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} draggable={true}>
                        <div className='flex justify-between'>
                            <div className={`${classes.formattedText} flex-95`}>{htmlToReactParser.parse(cardInfo?.content)}</div>
                            {
                                visible &&
                                <div onClick={deleteTaskHandler} className='cursor-pointer absolute right-2 top-2 bg-white p-3 rounded-full'>
                                    <Image src={deleteIcon} width={16} height={16} alt='' />
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}
