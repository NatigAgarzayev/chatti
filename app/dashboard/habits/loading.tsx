import MainSkeleton from '@/components/MainSkeleton'
import React from 'react'

export default function loading() {
    return (
        <div className='flex w-full h-screen bg-white dark:bg-gray-900'>
            <MainSkeleton />
            <MainSkeleton />
        </div>
    )
}
