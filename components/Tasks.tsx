'use client'
import React from 'react'
import Kanban from './Kanban'
import { useQuery } from '@tanstack/react-query'
import { getUserKanban } from '@/api/kanbanClient'

export default function Tasks({user}: {user: any}) {

    const {data:kanbanData, isLoading: kanbanLoading} = useQuery({
        queryKey: ['kanban'],
        queryFn: async () => {
            const res = await getUserKanban({ id: user.id })
            return res
        }
    })

    if(kanbanLoading){
        <div className='flex-auto p-4 h-full dark:bg-gray-900'>
            <Kanban loading={true} kanbanData={[]} />
        </div>
    }

    return (
        <div className='flex-auto p-4 h-full dark:bg-gray-900'>
            <Kanban kanbanData={kanbanData ?? []} />
        </div>
    )
}
