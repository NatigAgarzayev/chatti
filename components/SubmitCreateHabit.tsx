'use client'
import {createUserHabit} from '@/api/habitClient'
import {useHabit, useStore} from '@/store/store'
import {useAuth} from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'
import Moment from 'react-moment'

export const getUserTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};


export default function SubmitCreateHabit() {

    const updateCreateModal = useStore(state => state.updateCreateModal)
    const habitLoading = useStore(state => state.habitLoading)
    const updateHabitLoading = useStore(state => state.updateHabitLoading)
    const habits = useHabit((state) => state.habits)
    const updateHabits = useHabit((state) => state.updateHabits)
    const [radioValue, setRadioValue] = useState("count")
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ title, user, type, count, timer, timezone }: {title: string, user: string, type: string, count: number, timer?: Moment | FormDataEntryValue, timezone: string }) => {
            const res = await createUserHabit({
                title,
                user,
                type,
                count,
                timer,
                timezone,
            })
            return res
        },
        onSuccess: (res) => {
            if(res){
                const newHabitArr = [...habits, res[0]]
                updateHabits(newHabitArr)
            }
            queryClient.invalidateQueries({ queryKey: ['habits'] })
        }
    })

    const createHabit = async (formData: FormData) => {
        const { habit, type, count, timer } = Object.fromEntries(formData)
        if (habit.toString().trim() === "") {
            alert("Please enter a habit")
            return
        }
        updateHabitLoading(true)
        const timezoneDefine = getUserTimezone()
        mutation.mutate({ 
            title: habit + "", 
            user: userId + "",
            type: type + "", 
            count: +count, 
            timer: timer === "" ? moment().format() + "" : timer, 
            timezone: timezoneDefine 
        })
        updateHabitLoading(false)
        updateCreateModal(false)
    }

    return (
        <form action={createHabit}>
            <div className='flex flex-col gap-4'>
                <input placeholder='max 20 letters' maxLength={20} type="text" name='habit' className='border-2 p-1 pl-3 py-2 outline-none dark:bg-gray-100 border-gray-700 rounded-3xl' />
                <button disabled={habitLoading} className='p-2 bg-indigo-400 dark:bg-gray-100 text-gray-700 font-bold rounded-3xl dark:disabled:bg-gray-300 disabled:bg-indigo-200' type='submit'>{habitLoading ? "Creating..." : "Create"}</button>
            </div>
            <div className='mt-4'>
                <h3 className='font-bold dark:text-gray-100'>Habit type:</h3>
                <div className='flex items-center gap-2'>
                    <input onChange={(e) => setRadioValue(e.target.value)} value="count" type="radio" name="type" id="count" defaultChecked />
                    <label htmlFor="count" className='dark:text-gray-100'>counter</label>
                </div>
                {
                    radioValue === "count" &&
                    <input type="number" name="count" min={0} className='border-2 p-1 pl-3 my-1 outline-none dark:bg-gray-100 border-gray-700 rounded-3xl' placeholder='deafult: 0' />
                }
                <div className='flex items-center gap-2'>
                    <input onChange={(e) => setRadioValue(e.target.value)} value="timer" type="radio" name="type" id="timer" />
                    <label htmlFor="timer" className='dark:text-gray-100'>timer</label>
                </div>
                {
                    radioValue === "timer" &&
                    <input type="datetime-local" name="timer" className='border-2 p-1 pl-3 my-1 dark:bg-gray-100 outline-none border-gray-700 rounded-3xl' placeholder='deafult: now' />
                }
            </div>
        </form>
    )

}