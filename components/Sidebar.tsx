'use client'
import React, { useEffect } from 'react'
import NavLink from './NavLink'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { getUserData, userLogOut } from '@/api/authClient'
import { useUser } from '@/store/store'

export default function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const setUser = useUser(state => state.setUser)
    const user = useUser(state => state.user)
    useEffect(() => {
        async function getUser() {
            const user: any = await getUserData()
            setUser(user)
        }
        getUser()
    }, [])


    const logoutUser = async () => {
        await userLogOut()
        router.push("/login")
    }

    return (
        <aside className="relative min-w-60 h-full bg-gray-200">
            <h1 className="text-center mt-4 font-bold text-xl">Chatti Tracking</h1>
            <ul>
                {<li className={`mt-4 text-center p-4 rounded-sm ${pathname === "/dashboard/main" ? "bg-gray-400" : "bg-gray-300"} hover:bg-gray-400 cursor-pointer`}>
                    <NavLink link={"/dashboard/main"} content={"Main"} />
                </li>}
                <li onClick={logoutUser} className={`mt-4 text-center p-4 rounded-sm bg-gray-300 hover:bg-gray-400 cursor-pointer`}>
                    Logout
                </li>
            </ul>
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-900'>
                {user?.email}
            </div>
        </aside>
    )
}
