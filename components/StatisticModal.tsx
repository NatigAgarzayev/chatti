'use client'
import { useStore } from '@/store/store'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import NivoResponsiveCalendar from './NivoResponsiveCalendar'
import { Habit } from '@/types'
import { motion } from 'framer-motion'
import Moment from "react-moment";
import { getUserHabitById } from "@/api/habitClient";
import moment from "moment";


export default function StatisticModal({ dataId }: { dataId: number }) {

    const statisticModal = useStore(state => state.statisticModal)
    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const [noRecords, setNoRecords] = useState(false)
    const [stat, setStat] = useState<Habit>()
    const [year, setYear] = useState(new Date().getFullYear())


    useEffect(() => {
        async function fetchStatistic() {
            try {
                const res = await getUserHabitById({ id: dataId })
                    .then(res => {
                        if (res) {
                            setStat(res[0])
                            if (res[0].records.length === 0) {
                                setNoRecords(true)
                            }
                        }
                    })
            } catch (error) {
                console.error("Error fetching statistics: ", error)
            }
        }
        fetchStatistic()
    }, [])

    return (
        <Dialog open={statisticModal} onClose={() => updateStatisticModal(false)} className="relative z-50">
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
                        <DialogTitle className="font-bold dark:text-gray-100">
                            Analytics of {stat?.title + ' '}
                            ({stat?.type === 'timer' ?
                                (noRecords ? <> Streak: <Moment diff={stat?.created_at} unit="days" /> days </>

                                    : 'Streak: ' + Math.max(stat?.streak, moment().diff(stat?.created_at, 'days')) + ' days')
                                :
                                'count: ' + stat?.count})
                        </DialogTitle>
                        <Description className="dark:text-gray-100 flex items-center gap-2">
                            <div onClick={() => setYear(year - 1)} className="cursor-pointer w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-black transform rotate-[270deg]"></div>
                            <p>
                                {`1 Jan ${year} - 31 Dec ${year}`}
                            </p>
                            <div onClick={() => setYear(year + 1)} className="cursor-pointer w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-black transform rotate-90"></div>
                        </Description>
                        <div className='h-[200px] w-[1000px]'>
                            <NivoResponsiveCalendar data={stat?.records || []} year={year} />
                        </div>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}