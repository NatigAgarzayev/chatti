'use client'
import Link from 'next/link'
import React from 'react'

export default function NavLink({ link, content, pathname }: { link: string, content: string, pathname?: string }) {

    return (
        <Link href={link} className={`text-center flex justify-center w-[80%] mx-auto  p-4 text-gray-700 font-bold rounded-full ${pathname === link ? "bg-indigo-400" : "bg-indigo-300"} hover:bg-indigo-400 cursor-pointer`} replace>
            {content}
        </Link>
    )
}
