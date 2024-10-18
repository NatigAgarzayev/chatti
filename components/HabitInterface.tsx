'use client'
import React, {useState} from 'react'
import HabitController from './HabitController'
import {Habit} from '@/types'
import HabitStopwatch from './HabitStopwatch'
import {motion} from 'framer-motion'
import pinnedIcon from '../public/images/pin.svg'
import pinnedActiveIcon from '../public/images/pin-active.svg'
import Image from "next/image"
import {useUser} from "@clerk/nextjs";
import {useHabit} from "@/store/store";
import {handlePinnedCondition} from "@/api/habitClient"

export default function HabitInterface({ data }: { data: Habit }) {

    const [visible, setVisible] = useState(false)
    const {user} = useUser()
    const habits = useHabit(state => state.habits)
    const updateHabit = useHabit(state => state.updateHabits)

    const handlePin = async () => {
        const res = await handlePinnedCondition(
            {
                id: data.id,
                pinned: !data.pinned
            }
        )
        const index = habits.findIndex(habit => habit.id === data.id)
        const newHabitArr = [...habits]
        if(res) {
            newHabitArr[index] = res[0]
            updateHabit(newHabitArr)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='relative w-60 h-fit m-6 p-4 border-2 border-gray-700 dark:border-gray-200 rounded-3xl'>
                <h3 className='text-lg flex items-center justify-between dark:text-white'>
                    <p>{data.title}</p>
                    {
                        user?.publicMetadata.paid ?
                            data.pinned ?
                                <Image onClick={handlePin} className='cursor-pointer' src={pinnedActiveIcon} width={20} height={20} alt='pinned' />
                                :
                                visible &&
                                <Image onClick={handlePin} className='cursor-pointer' src={pinnedIcon} width={20} height={20} alt='pinned' />
                            :
                            null
                    }
                </h3>
                {
                    data.type === "count" ?
                        <HabitController visible={visible} id={data.id} count={data.count} />
                        :
                        <HabitStopwatch visible={visible} id={data.id} timer={data.created_at} />
                }
            </div>
        </motion.div>
    )
}
