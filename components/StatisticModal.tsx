'use client'
import { useStore } from '@/store/store'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import NivoResponsiveCalendar from './NivoResponsiveCalendar'
import { Habit } from '@/types'
import { motion } from 'framer-motion'


export default function StatisticModal({ data }: { data: Habit }) {

    const statisticModal = useStore(state => state.statisticModal)
    const udpateStatisticModal = useStore(state => state.updateStatisticModal)

    return (
        <Dialog open={statisticModal} onClose={() => udpateStatisticModal(false)} className="relative z-50">
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
                    <DialogPanel className="space-y-4 border bg-white p-6 rounded-3xl dark:bg-gray-800">
                        <DialogTitle className="font-bold dark:text-gray-100">Analytics of {data.title} ({data.count})</DialogTitle>
                        <Description className="dark:text-gray-100">{`1 Jan ${new Date().getFullYear()} - 31 Dec ${new Date().getFullYear()}`}</Description>
                        <div className='h-[200px] w-[1000px]'>
                            <NivoResponsiveCalendar data={data.records} />
                        </div>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
