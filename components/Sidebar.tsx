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
        <aside className="relative min-w-60 h-full bg-gray-100 rounded-r-3xl">
            <h1 className="text-center mt-4 font-bold text-2xl text-gray-700">Chatti Tracking</h1>
            <ul className='mt-8'>
                <li className={`mt-4 text-center w-[80%] mx-auto p-4 text-gray-700 font-bold rounded-full ${pathname === "/dashboard/main" ? "bg-indigo-400" : "bg-indigo-300"} hover:bg-indigo-400 cursor-pointer`}>
                    <NavLink link={"/dashboard/main"} content={"Main"} />
                </li>
            </ul>
            <li onClick={logoutUser} className='absolute bottom-10 left-1/2 -translate-x-1/2 mt-4 list-none text-center p-4 text-gray-700 font-bold w-[80%] mx-auto rounded-full bg-indigo-300 hover:bg-indigo-400 cursor-pointer'>
                Logout
            </li>
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-700'>
                {user?.email}
            </div>
        </aside>
    )
}
