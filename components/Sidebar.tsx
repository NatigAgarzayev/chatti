'use client'
import React, { useEffect } from 'react'
import NavLink from './NavLink'
import { usePathname, useRouter } from 'next/navigation'
import { getUserData, userLogOut } from '@/api/authClient'
import { useStore, useUser } from '@/store/store'
import addTaskIcon from "../images/add-task.svg"
import Image from 'next/image'

export default function Sidebar() {
    const updateTaskModal = useStore(state => state.updateTaskModal)
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
        <aside className="relative flex-240 h-full bg-gray-100 rounded-r-3xl">
            <h1 className="text-center mt-4 font-bold text-2xl text-gray-700">Chatti Tracking</h1>
            <ul className='mt-8'>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/main"} content={"Main"} pathname={pathname} />
                </li>
                <li className='mt-4'>
                    <NavLink link={"/dashboard/kanban"} content={"Kanban"} pathname={pathname} />
                    {
                        pathname === "/dashboard/kanban" &&
                        <ul className='mx-6 mt-2'>
                            <li onClick={() => updateTaskModal(true)} className='ml-8 text-gray-500 font-semibold cursor-pointer flex items-center gap-1'>
                                <Image src={addTaskIcon} alt="add task" width={18} height={18} />
                                Create
                            </li>
                        </ul>
                    }
                </li>
            </ul>
            <li onClick={logoutUser} className='absolute bottom-10 left-1/2 -translate-x-1/2 mt-4 list-none text-center p-2 text-gray-700 font-bold w-[80%] mx-auto rounded-full bg-indigo-300 hover:bg-indigo-400 cursor-pointer'>
                Logout
            </li>
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-700'>
                {user?.email}
            </div>
        </aside>
    )
}
