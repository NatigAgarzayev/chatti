'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Draggable } from "react-beautiful-dnd"
import deleteIcon from "../public/images/delete.svg"

import { Parser as HtmlToReactParser } from 'html-to-react';
import classes from "../styles/quill-styles.module.css"
import { useStore } from '@/store/store';
import menuIcon from "../public/images/menu.svg"
import editIcon from "../public/images/edit-icon.svg"

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

export default function KanbanCard({ cardInfo, index }: { cardInfo: any, index: number }) {

    const [visible, setVisible] = useState(false)

    const updateConfirmDeleteTaskModal = useStore(state => state.updateConfirmDeleteTaskModal)
    const updateModalId = useStore(state => state.updateModalId)
    const updateEditTask = useStore(state => state.updateEditTask)
    const updateEditTaskId = useStore(state => state.updateEditTaskId)

    const htmlToReactParser = HtmlToReactParser()
    const deleteTaskHandler = async () => {
        updateConfirmDeleteTaskModal(true)
        updateModalId(cardInfo.id)
        setVisible(false)
    }

    const updateTaskHandler = () => {
        updateEditTask(true)
        updateEditTaskId(cardInfo.id)
        setVisible(false)
    }

    return (
        <Draggable
            draggableId={cardInfo.id.toString()}
            index={index}
        >

            {
                (provided: any) => (
                    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='relative flex-1 rounded-3xl mb-4 p-4 bg-indigo-200' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} draggable={true}>
                        <div className='flex relative justify-between'>
                            <div className={`${classes.formattedText} flex-95`}>{htmlToReactParser.parse(cardInfo?.content)}</div>
                            {
                                visible &&
                                <Popover>
                                    <PopoverButton className="cursor-pointer outline-none absolute -right-2 -top-2 bg-white p-3 rounded-full">
                                        <Image src={menuIcon} width={16} height={16} alt='' />
                                    </PopoverButton>
                                    <PopoverPanel anchor="bottom">
                                        <ul className='cursor-pointer right-2 top-2 bg-white rounded-3xl border overflow-hidden'>
                                            <li onClick={deleteTaskHandler} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                                <Image src={deleteIcon} width={16} height={16} alt='' />
                                                <p>Delete</p>
                                            </li>
                                            <li onClick={updateTaskHandler} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                                <Image src={editIcon} width={18} height={18} alt='' />
                                                <p>Edit</p>
                                            </li>
                                        </ul>
                                    </PopoverPanel>
                                </Popover>
                                /* <div onClick={() => { updateMenuOpen(true), setOpenedId(cardInfo.id) }} className='cursor-pointer absolute -right-2 -top-2 bg-white p-3 rounded-full'>
                                    <Image src={menuIcon} width={16} height={16} alt='' />
                                </div> */
                            }
                            {/* {
                                menuOpen && cardInfo.id === openedId &&
                                <ul className='cursor-pointer absolute z-20 right-2 top-2 bg-white rounded-3xl border overflow-hidden'>
                                    <li onClick={deleteTaskHandler} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                        <Image src={deleteIcon} width={16} height={16} alt='' />
                                        <p>Delete</p>
                                    </li>
                                    <li onClick={updateTaskHandler} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                        <Image src={editIcon} width={18} height={18} alt='' />
                                        <p>Edit</p>
                                    </li>
                                </ul>
                            } */}
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}
