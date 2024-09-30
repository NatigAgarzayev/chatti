'use client'
import Link from 'next/link'
import React from 'react'
import habitHomeIcon from "../public/images/habit-home.svg"
import task from "../public/images/task.svg"
import timer from "../public/images/timer.svg"
import Image from 'next/image'
import clsx from 'clsx'

const iconsArr = [habitHomeIcon, task, timer]

export default function NavLink({faze, link, content, pathname, img, theme }: {faze: string, link: string, content: string, pathname?: string, theme: string, img: number }) {
    return (
        <Link href={link} className={`text-center flex justify-center w-[90%] mx-auto  p-4 text-gray-700 font-bold rounded-full ${pathname === link ? "bg-indigo-400 dark:bg-white" : "bg-indigo-300 dark:bg-white/75"} hover:bg-indigo-400 dark:hover:bg-white cursor-pointer`} replace>
            {
                faze === "short" &&
            <Image src={iconsArr[img]} alt="icon" width={22} height={20} />
            }
            <p className={clsx(faze === "short" && "hidden")}>{content}</p>
        </Link>
    )
}
