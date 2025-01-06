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
import burgerIcon from "../public/images/burger.svg"
import burgerDarkIcon from "../public/images/burger-dark.svg"
import crownIcon from "../public/images/crown.svg"
import clsx from 'clsx'
import { loadStripe } from '@stripe/stripe-js'

export default function Sidebar() {
    const [theme, setTheme] = useState("light")
    const [rdrct, setRdrct] = useState(false)
    const [proPopover, setProPopover] = useState(false)
    const [faze, setFaze] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('faze') || "long"
        }
        return "long"
    })

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setTheme("dark")
        } else {
            document.documentElement.classList.remove('dark');
            setTheme("light")
        }

    }, [theme]);

    useEffect(() => {
        if (localStorage.faze === 'long' || (!('faze' in localStorage))) {
            setFaze("long")
        } else {
            setFaze("short")
        }
    }, [])

    const updateTaskModal = useStore(state => state.updateTaskModal)
    const pathname = usePathname()
    const { user } = useUser()

    const fazeHandler = () => {
        if (faze === "long") {
            setFaze("short")
            localStorage.setItem('faze', 'short')
        } else {
            setFaze("long")
            localStorage.setItem('faze', 'long')
        }
    }

    const stripeHandler = async () => {
        if (!user) return
        setRdrct(true)
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
        )
        console.log("stripe", stripe)
        if (!stripe) return
        const response = await fetch('/api/stripe', {
            "method": 'POST',
        });
        const data = await response.json();

        setRdrct(false)
        if (data) {
            console.log("data", data)
            window.location.href = data.result.url;
        }
    }

    return (
        <aside className={
            clsx(
                "relative h-full bg-gray-100 dark:bg-gray-800 rounded-r-3xl dark:rounded-none",
                faze === "long" ? "flex-240 w-full" : "flex-0 max-w-16 min-w-16"
            )
        }>
            <div className={clsx('w-[90%] mx-auto flex items-center mt-4', faze === "long" ? "justify-between" : "justify-center")}>
                <h1 className={clsx("font-bold text-lg text-gray-700 dark:text-gray-200", faze === "short" && "hidden")}>Chatti Tracking {user?.publicMetadata.paid ? "Pro" : null}</h1>
                {
                    theme === "light" ?
                        <Image onClick={fazeHandler} className='cursor-pointer' src={burgerIcon} width={24} alt='burger' />
                        :
                        <Image onClick={fazeHandler} className='cursor-pointer' src={burgerDarkIcon} width={24} alt='burger' />
                }
            </div>
            <ul className='mt-8'>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/habits"} faze={faze} theme={theme} img={0} content={"Habits"} pathname={pathname} />
                </li>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/tasks"} faze={faze} theme={theme} img={1} content={"Tasks"} pathname={pathname} />
                    {
                        pathname === "/dashboard/tasks" &&
                        <ul className='mx-6 mt-2'>
                            <li onClick={() => updateTaskModal(true)} className={clsx(
                                'text-gray-500 dark:text-gray-300 font-semibold cursor-pointer flex items-center gap-1',
                                faze === "long" ? "ml-8" : "ml-0 gap-0"
                            )}>
                                <Image src={addTaskIcon} alt="add task" width={20} />
                                <p className={clsx(faze === "short" && "hidden")}>Create</p>
                            </li>
                        </ul>
                    }
                </li>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/timetracker"} faze={faze} theme={theme} img={2} content={"Time Tracker"} pathname={pathname} />
                </li>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/team"} faze={faze} theme={theme} img={2} content={"Team"} pathname={pathname} />
                </li>
            </ul>
            {
                user?.publicMetadata.paid ? null : (
                    <div>
                        <div className={
                            clsx(
                                'transition-opacity absolute w-[80%] p-2 rounded-md bottom-36 bg-gray-300 left-1/2 -translate-x-1/2',
                                faze === 'long' && proPopover ? 'opacity-1' : 'opacity-0',
                            )
                        }>
                            <p className='text-sm'>You will get in Chatti Pro:</p>
                            <ul className='text-sm list-disc ml-8'>
                                <li>15 habit slots (+10)</li>
                                <li>pin habits (no limits)</li>
                            </ul>
                            <div className=" absolute
                              left-1/2 -translate-x-1/2
                              -bottom-4 w-0 h-0
                              border-l-[12px] border-l-transparent
                              border-t-[16px] border-t-gray-300
                              border-r-[12px] border-r-transparent">
                            </div>
                        </div>
                        <button onMouseEnter={() => setProPopover(true)} onMouseLeave={() => setProPopover(false)}
                            onClick={stripeHandler} className={clsx('w-[90%] flex justify-center gap-2 absolute bottom-16 left-1/2 -translate-x-1/2 p-3 rounded-md bg-amber-500 font-bold', faze === "short" && "w-[65%] p-[8px]")}>
                            <Image src={crownIcon} width={22} height={22} alt='crown' />
                            <p className={clsx(faze === "short" && "hidden")}>
                                {rdrct && faze === "long" ? "Redirecting.." : "Get Chatti PRO"}
                            </p>
                        </button>
                    </div>
                )
            }
            <div className='absolute bottom-4 left-1/4 -translate-x-1/2 text-gray-700'>
                <div className={clsx('flex item-center gap-2', faze === "short" && "hidden")}>
                    <SignedIn>
                        <UserButton />
                        <p className='dark:text-white w-14 overflow-hidden text-ellipsis'>
                            {user?.username}
                        </p>
                    </SignedIn>
                </div>
            </div>
            <div className={clsx('absolute bottom-3 right-4', faze === "short" && "right-[12px]")}>
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