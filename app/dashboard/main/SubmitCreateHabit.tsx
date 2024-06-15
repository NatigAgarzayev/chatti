import { getUserData } from '@/api/auth'
import { createUserHabit } from '@/api/habit'
import { revalidatePath } from 'next/cache'
import React from 'react'

export default function SubmitCreateHabit() {

    const createHabit = async (formData: FormData) => {
        "use server"
        const user: any = await getUserData()
        const { habit } = Object.fromEntries(formData)
        console.log(habit)
        await createUserHabit({ title: habit + "", user: user.id })
        revalidatePath("/dashboard/main")
    }

    return (
        <form action={createHabit}>
            <input type="text" name='habit' className='border-2 p-1 border-gray-400' />
            <button className='ml-4 p-2 bg-emerald-100' type='submit'>Create</button>
        </form>
    )
}
