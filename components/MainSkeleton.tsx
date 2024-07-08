'use client'
import React from 'react'

export default function MainSkeleton() {
    return (
        <div className='animate-pulse w-60 h-[120px] m-8 p-4 border-2 border-gray-300 rounded-3xl'>
            <div className='h-5 w-30 bg-gray-300 rounded-xl'></div>
            <div className='flex justify-between items-center mt-4'>
                <div className='w-10 h-10 border-gray-600 rounded-full bg-gray-200'></div>
                <div className='w-5 h-7 bg-gray-200 text-center flex justify-center items-center rounded-xl'></div>
                <div className='w-10 h-10 border-gray-600 rounded-full bg-gray-200'></div>
            </div>
        </div>
    )
}
