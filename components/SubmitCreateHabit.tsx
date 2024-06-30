'use client'
import { getUserData } from '@/api/authClient'
import { createUserHabit } from '@/api/habitClient'
import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SubmitCreateHabit() {
    const [loading, setLoading] = useState(false)
    const updateCreateModal = useStore(state => state.updateCreateModal)
    const habitLoading = useStore(state => state.habitLoading)
    const updateHabitLoading = useStore(state => state.updateHabitLoading)
    const router = useRouter()

    const createHabit = async (formData: FormData) => {
        updateHabitLoading(true)
        const user: any = await getUserData()
        const { habit } = Object.fromEntries(formData)
        if (habit.toString().trim() === "") {
            alert("Please enter a habit")
            return
        }
        await createUserHabit({ title: habit + "", user: user.id })
        router.refresh()
        updateHabitLoading(false)
        updateCreateModal(false)
    }

    return (
        <form action={createHabit}>
            <input type="text" name='habit' className='border-2 p-1 border-gray-400' />
            <button disabled={habitLoading} className='ml-4 p-2 bg-emerald-100' type='submit'>{habitLoading ? "Creating..." : "Create"}</button>
        </form>
    )
}
