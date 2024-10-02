import Kanban from '@/components/Kanban'
import React from 'react'

export default function loading() {
    return (
        <div className='flex-auto p-4 h-full dark:bg-gray-900'>
            <Kanban loading={true} kanbanData={[]} />
        </div>
    )
}
