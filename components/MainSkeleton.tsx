'use client'
import React from 'react'

export default function MainSkeleton() {
    return (
        <div className='animate-pulse w-60 h-[120px] m-8 p-4 border-2 border-gray-300 rounded-3xl'>
            <div className='h-5 w-30 bg-gray-300 rounded-xl dark:bg-gray-700'></div>
            <div className='w-5 h-7 bg-gray-200 dark:bg-gray-800 text-center flex justify-center items-center rounded-xl'></div>
        </div>
    )
}
