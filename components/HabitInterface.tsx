'use client'
import React, { useState } from 'react'
import HabitController from './HabitController'
import { Habit } from '@/types'
import HabitStopwatch from './HabitStopwatch'
import { motion } from 'framer-motion';

export default function HabitInterface({ data }: { data: Habit }) {

    const [visible, setVisible] = useState(false)

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
            <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='relative w-60 h-fit m-6 p-4 border-2 border-gray-700 rounded-3xl'>
                <h3 className='text-lg'>{data.title}</h3>
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
