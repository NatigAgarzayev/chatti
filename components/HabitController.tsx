import { decreaseHabitCount, increaseHabitCount } from '@/api/habit'
import { revalidatePath } from 'next/cache'
import React from 'react'

export default function HabitController({ id, count }: { id: number, count: number }) {

    return (
        <form className='flex item-center justify-between'>
            <button formAction={async () => {
                "use server"
                if (count === 0) return
                await decreaseHabitCount({ id: id, count: count })
                revalidatePath("/dashboard/main")
            }} className='w-10 h-10 border-gray-600 rounded-full bg-gray-200 hover:bg-gray-300'>
                -
            </button>
            <div className='text-center flex justify-center items-center text-xl'>{count}</div>
            <button formAction={async () => {
                "use server"
                await increaseHabitCount({ id: id, count: count })
                revalidatePath("/dashboard/main")
            }} className='w-10 h-10 border-gray-600 rounded-full bg-gray-200 hover:bg-gray-300'>
                +
            </button>
        </form>
    )
}
