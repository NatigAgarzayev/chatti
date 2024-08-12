import Kanban from '@/components/Kanban'
import React from 'react'

export default function loading() {
    return (
        <div className='flex-auto p-4 h-full'>
            <Kanban loading={true} kanbanData={[]} />
        </div>
    )
}
