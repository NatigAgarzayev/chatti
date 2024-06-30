'use client'
import React from 'react'
import NavLink from './NavLink'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { userLogOut } from '@/api/authClient'

export default function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()

    const logoutUser = async () => {
        await userLogOut()
        router.push("/login")
    }

    return (
        <aside className="min-w-60 bg-gray-200">
            <h1 className="text-center mt-4 font-bold text-xl">Chatti Tracking</h1>
            <ul>
                {<li className={`mt-4 text-center p-4 rounded-sm ${pathname === "/dashboard/main" ? "bg-gray-400" : "bg-gray-300"} hover:bg-gray-400 cursor-pointer`}>
                    <NavLink link={"/dashboard/main"} content={"Main"} />
                </li>}
                <li onClick={logoutUser} className={`mt-4 text-center p-4 rounded-sm bg-gray-300 hover:bg-gray-400 cursor-pointer`}>
                    Logout
                </li>
            </ul>
        </aside>
    )
}
