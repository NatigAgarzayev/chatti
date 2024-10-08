'use client'
import React, { useEffect, useReducer, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import KanbanBoard from './KanbanBoard'
import KanbanType from "../types/index"
import CreateTask from './CreateTask'
import { updateTaskProgress } from '@/api/kanbanClient'
import { useStore } from '@/store/store'
import ConfirmDeleteTask from './ConfirmDeleteTask'
import EditTask from './EditTask'

const boards = ["Todo", "Doing", "Done"]

export default function Kanban({ loading, kanbanData }: { loading?: boolean, kanbanData: KanbanType[] }) {
    const [storage, setStorage] = useState<KanbanType[]>([])
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    const confirmDeleteTaskModal = useStore(state => state.confirmDeleteTaskModal)
    const editTask = useStore(state => state.editTask)

    useEffect(() => {
        if (kanbanData !== storage) {
            setStorage(kanbanData.sort((a, b) => (a.id) < (b.id) ? -1 : 1))
        }
    }, [kanbanData])

    const move = (list: KanbanType[], stepName: number, elementId: number, index: number) => {
        const newArray = list
        console.log('order:', index)
        let needObj: KanbanType = {
            id: 0,
            content: '',
            created_at: '',
            author_id: '',
            progress: 0,
        }
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id == elementId) {
                needObj = newArray[i]
                newArray.splice(i, 1)
                break
            }
        }
        needObj.progress = stepName
        newArray.push(needObj)
        newArray.sort((a, b) => (a.id) < (b.id) ? -1 : 1)
        setStorage(newArray)
        updateTaskProgress(elementId, stepName)
        forceUpdate()
    }

    const onDragEnd = (result: { destination: any; source: any; draggableId: any }) => {
        const { destination, source, draggableId } = result


        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        if (destination.droppableId === "droppable1") {
            move(storage, 1, draggableId, destination.index)
        }
        else if (destination.droppableId === "droppable2") {
            move(storage, 2, draggableId, destination.index)
        }
        else if (destination.droppableId === "droppable3") {
            move(storage, 3, draggableId, destination.index)
        }
    }

    return (
        <>
            <CreateTask />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex flex-col h-sfit gap-10 md:gap-5 justify-between md:flex-row'>
                    <div className='h-1/3 md:flex-33 md:h-full'>
                        <h3 className='text-xl dark:text-white font-semibold text-center mb-2'>{boards[0]}({storage?.filter(x => x.progress === 1).length})</h3>
                        <KanbanBoard loading={loading} dropId={`droppable1`} innerItems={storage?.filter(x => x.progress === 1)} />
                    </div>
                    <div className='h-1/3 md:flex-33 md:h-full'>
                        <h3 className='text-xl dark:text-white font-semibold text-center mb-2'>{boards[1]}({storage?.filter(x => x.progress === 2).length})</h3>
                        <KanbanBoard loading={loading} dropId={`droppable2`} innerItems={storage?.filter(x => x.progress === 2)} />
                    </div>
                    <div className='h-1/3 md:flex-33 md:h-full'>
                        <h3 className='text-xl dark:text-white font-semibold text-center mb-2'>{boards[2]}({storage?.filter(x => x.progress === 3).length})</h3>
                        <KanbanBoard loading={loading} dropId={`droppable3`} innerItems={storage?.filter(x => x.progress === 3)} />
                    </div>

                </div>
            </DragDropContext>
            {
                confirmDeleteTaskModal &&
                <ConfirmDeleteTask />
            }
            {
                editTask &&
                <EditTask />
            }
        </>
    )
}
