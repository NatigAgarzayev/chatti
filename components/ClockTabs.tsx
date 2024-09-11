'use client'
import React, { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Stopwatch from '@/components/Stopwatch'
import Timer from '@/components/Timer'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ClockTabs() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const tab = searchParams.get('tab')

    useEffect(() => {
        if (!tab || (tab !== "stopwatch" && tab !== "timer")) {
            router.push("?tab=stopwatch")
            setSelectedIndex(0)
        }
        if (tab === "stopwatch") {
            setSelectedIndex(0)
        }
        if (tab === "timer") {
            setSelectedIndex(1)
        }
    }, [tab])

    return (
        <TabGroup manual selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList className="flex gap-4">
                <Tab onClick={() => router.push("?tab=stopwatch")} className="data-[selected]:bg-indigo-400 bg-indigo-200 dark:data-[selected]:bg-gray-100 dark:bg-gray-400 p-4 rounded-3xl font-bold text-gray-700 outline-none">Stopwatch</Tab>
                <Tab onClick={() => router.push("?tab=timer")} className="data-[selected]:bg-indigo-400 bg-indigo-200 dark:data-[selected]:bg-gray-100 dark:bg-gray-400 p-4 rounded-3xl font-bold text-gray-700 outline-none">Timer</Tab>
            </TabList>
            <TabPanels className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TabPanel >
                    <Stopwatch />
                </TabPanel>
                <TabPanel >
                    <Timer />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}
