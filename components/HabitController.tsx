'use client'
import { decreaseHabitCount, increaseHabitCount } from '@/api/habitClient'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export default function HabitController({ id, count }: { id: number, count: number }) {

    const router = useRouter()

    const [countRapid, setCountRapid] = useState(count)
    const [loading, setLoading] = useState(false)

    const decrease = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (countRapid === 0) {
            setLoading(false)
            return
        }
        setCountRapid(curr => curr - 1)
        await decreaseHabitCount({ id: id, count: countRapid, time: moment().format() })
        router.refresh()
        setLoading(false)
    }

    const increase = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setCountRapid(curr => curr + 1)
        await increaseHabitCount({ id: id, count: countRapid, time: moment().format() })
        router.refresh()
        setLoading(false)
    }

    return (
        <form className='flex item-center justify-between'>
            <button disabled={loading} onClick={decrease} className='w-10 h-10 border-gray-600 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-red-300'>
                -
            </button>
            <div className='text-center flex justify-center items-center text-xl'>{countRapid}</div>
            <button disabled={loading} onClick={increase} className='w-10 h-10 border-gray-600 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-red-300'>
                +
            </button>
        </form>
    )
}
