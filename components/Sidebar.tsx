'use client'
import React from 'react'
import NavLink from './NavLink'
import { usePathname } from 'next/navigation'
import { useStore } from '@/store/store'
import addTaskIcon from "../public/images/add-task.svg"
import Image from 'next/image'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

export default function Sidebar() {
    const updateTaskModal = useStore(state => state.updateTaskModal)
    const pathname = usePathname()
    const { user } = useUser()

    return (
        <aside className="relative flex-240 h-full bg-gray-100 rounded-r-3xl">
            <h1 className="text-center mt-4 font-bold text-2xl text-gray-700">Chatti Tracking</h1>
            <ul className='mt-8'>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/habits"} content={"Habits"} pathname={pathname} />
                </li>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/tasks"} content={"Tasks"} pathname={pathname} />
                    {
                        pathname === "/dashboard/tasks" &&
                        <ul className='mx-6 mt-2'>
                            <li onClick={() => updateTaskModal(true)} className='ml-8 text-gray-500 font-semibold cursor-pointer flex items-center gap-1'>
                                <Image src={addTaskIcon} alt="add task" width={18} height={18} />
                                Create
                            </li>
                        </ul>
                    }
                </li>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/timetracker"} content={"Time Tracker"} pathname={pathname} />
                </li>
            </ul>
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-700'>
                <div className='flex item-center gap-2'>
                    <SignedIn>
                        <UserButton />
                        <p>
                            {user?.username}
                        </p>
                    </SignedIn>
                </div>
            </div>
        </aside>
    )
}
