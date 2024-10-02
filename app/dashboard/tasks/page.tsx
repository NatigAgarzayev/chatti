import { getUserKanban } from '@/api/kanban'
import Kanban from '@/components/Kanban'
import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'
import Loading from "./loading"
import { redirect } from 'next/navigation'

export default async function page() {
    const { userId }: { userId: string | null } = auth()

    let kanbanData = []

    if (userId) {
        kanbanData = await getUserKanban({ id: userId }) || []
    }
    else{
        redirect("/sign-in")
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className='flex-auto p-4 h-full dark:bg-gray-900'>
                <Kanban kanbanData={kanbanData ?? []} />
            </div>
        </Suspense>
    )
}
