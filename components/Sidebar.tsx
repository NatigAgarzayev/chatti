'use client'
import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import { usePathname } from 'next/navigation'
import { useStore } from '@/store/store'
import addTaskIcon from "../public/images/add-task.svg"
import Image from 'next/image'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import lightIcon from "../public/images/light.svg"
import darkIcon from "../public/images/dark.svg"

export default function Sidebar() {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          setTheme("dark")
        } else {
          document.documentElement.classList.remove('dark');
          setTheme("light")
        }
        
      }, [theme]);

    const updateTaskModal = useStore(state => state.updateTaskModal)
    const pathname = usePathname()
    const { user } = useUser()

    return (
        <aside className="relative flex-240 h-full bg-gray-100 dark:bg-gray-800 rounded-r-3xl dark:rounded-none">
            <h1 className="text-center mt-4 font-bold text-2xl text-gray-700 dark:text-gray-200">Chatti Tracking</h1>
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
            <div className='absolute bottom-4 left-1/4 -translate-x-1/2 text-gray-700'>
                <div className='flex item-center gap-2'>
                    <SignedIn>
                        <UserButton />
                        <p className='dark:text-white w-14 overflow-hidden text-ellipsis'>
                            {user?.username}
                        </p>
                    </SignedIn>
                </div>
            </div>
            <div className='absolute bottom-3 right-4'>
                <div className='w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer border border-gray-300'>
                    {
                        theme === "light" ?
                            <Image src={lightIcon} alt="avatar" width={20} height={20} onClick={() => {
                                setTheme("dark")
                                localStorage.setItem("theme", "dark")
                            }} />
                            :
                            <Image src={darkIcon} alt="avatar" width={20} height={20} onClick={() => {
                                setTheme("light")
                                localStorage.setItem("theme", "light")
                            }} />
                    }
                </div>
            </div>
        </aside>
    )
}
