'use client'
import { useStore } from '@/store/store'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import NivoResponsiveCalendar from './NivoResponsiveCalendar'
import { Habit } from '@/types'


export default function StatisticModal({ data }: { data: Habit }) {

    const statisticModal = useStore(state => state.statisticModal)
    const udpateStatisticModal = useStore(state => state.updateStatisticModal)

    return (
        <Dialog open={statisticModal} onClose={() => udpateStatisticModal(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="space-y-4 border bg-white p-6 rounded-3xl">
                    <DialogTitle className="font-bold">Analytics of {data.title} ({data.count})</DialogTitle>
                    <Description>{`1 Jan ${new Date().getFullYear()} - 31 Dec ${new Date().getFullYear()}`}</Description>
                    <div className='h-[200px] w-[1000px]'>
                        <NivoResponsiveCalendar data={data.records} />
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
