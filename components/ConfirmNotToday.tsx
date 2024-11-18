'use client'
import { getUserHabitById, confirmNotToday, getUserHabits } from '@/api/habitClient'
import { useHabit, useStore } from '@/store/store'
import { Habit } from '@/types'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
export default function ConfirmNotToday() {

    const updateHabits = useHabit((state: any) => state.updateHabits)
    const habits = useHabit((state: any) => state.habits)
    const editNotToday = useStore(state => state.editNotToday)
    const updateNotToday = useStore(state => state.updateNotToday)
    const editHabitId = useStore(state => state.editHabitId)
    const inputRef1 = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient();

    const fetchHabitData = useQuery({
        queryKey: ['habit', editHabitId],
        queryFn: async () => {
            const res = await getUserHabitById({id: editHabitId})
            if(res) {
                setTimeout(() => {
                    if(inputRef1.current){
                        inputRef1.current.value = moment().format('YYYY-MM-DDTHH:mm')
                    }   
                }, 100)
            }
        }
    })
/* 
    useEffect(() => {
        async function fetchHabitData() {
            setLoading(true)
            const res = await getUserHabitById({id: editHabitId})
            if(res) {
                setTimeout(() => {
                    if(inputRef1.current){
                        inputRef1.current.value = moment().format('YYYY-MM-DDTHH:mm')
                    }   
                    setLoading(false)
                }, 100)
            }
        }
        fetchHabitData()
    }, [editHabitId]) */

    const mutation = useMutation({
        mutationFn: async ({ id, created_at, addCount }: { id: number, created_at: string, addCount: number }) => {
            await confirmNotToday({
                id,
                created_at,
                addCount,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] })
        }
    })

    const confirmEditNotToday = async (formData: FormData) => {
        const timer = formData.get('timer') as string
        const addCount = formData.get('addCount') as string

        mutation.mutate({
            id: editHabitId,
            created_at: timer || "",
            addCount: +addCount || 1,
        });

        updateNotToday(false)
    }


    return (
        <Dialog open={editNotToday} onClose={() => updateNotToday(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <DialogPanel className="w-[340px] space-y-4 border bg-white dark:bg-gray-800 dark:border-gray-400 p-6 rounded-3xl text-center">
                        <DialogTitle className="font-bold text-xl dark:text-white">Add </DialogTitle>
                        <form action={confirmEditNotToday} className='flex flex-col gap-3'>
                            <input ref={inputRef1} id="timer" type="datetime-local" name='timer' className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                            <input defaultValue={1} type="number" name='addCount' min={1} className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                            <button disabled={fetchHabitData.isLoading || mutation.isPending} className={`p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl dark:bg-gray-100 disabled:bg-indigo-200 ${(fetchHabitData.isLoading || mutation.isPending) && "animate-pulse"} `} type='submit'>{(fetchHabitData.isLoading || mutation.isPending) ? "Process..." : "Update"}</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
