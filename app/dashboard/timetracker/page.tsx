import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
export default function page() {
    return (
        <div className='p-4 flex items-center gap-5 h-fit'>
            <TabGroup>
                <TabList>
                    <Tab className="data-[selected]:bg-indigo-300">Stopwatch</Tab>
                    <Tab className="data-[selected]:bg-indigo-300">Timer</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Content 1</TabPanel>
                    <TabPanel>Content 2</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
