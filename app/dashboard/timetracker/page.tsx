import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Stopwatch from '@/components/Stopwatch'
export default function page() {
    return (
        <div className='p-4 w-full h-full relative'>
            <TabGroup>
                <TabList className="flex gap-4">
                    <Tab className="data-[selected]:bg-indigo-400 bg-indigo-200 p-4 rounded-3xl font-bold text-gray-700 outline-none">Stopwatch</Tab>
                    <Tab className="data-[selected]:bg-indigo-400 bg-indigo-200 p-4 rounded-3xl font-bold text-gray-700 outline-none">Timer</Tab>
                </TabList>
                <TabPanels className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <TabPanel>
                        <Stopwatch />
                    </TabPanel>
                    <TabPanel>Comming soon...</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
