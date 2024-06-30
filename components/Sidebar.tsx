'use client'
import React from 'react'
import NavLink from './NavLink'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="min-w-60 bg-gray-200">
            <h1 className="text-center mt-4 font-bold text-xl">Chatti Tracking</h1>
            <ul>
                <li className={`mt-4 text-center p-4 rounded-sm ${pathname === "/dashboard/main" ? "bg-gray-400" : "bg-gray-300"} hover:bg-gray-400 cursor-pointer`}>
                    <NavLink link={"/dashboard/main"} content={"Main"} />
                </li>
            </ul>
        </aside>
    )
}
