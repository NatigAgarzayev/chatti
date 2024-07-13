import MainSkeleton from '@/components/MainSkeleton'
import React from 'react'

export default function loading() {
    return (
        <div className='flex'>
            <MainSkeleton />
            <MainSkeleton />
        </div>
    )
}
