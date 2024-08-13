import { getUserKanban } from '@/api/kanban'
import Kanban from '@/components/Kanban'
import { auth } from '@clerk/nextjs/server'

export default async function page() {
    const { userId }: { userId: string | null } = auth()

    let kanbanData = []

    if (userId) {
        kanbanData = await getUserKanban({ id: userId }) || []
    }

    return (
        <div className='flex-auto p-4 h-full'>
            <Kanban kanbanData={kanbanData ?? []} />
        </div>
    )
}
