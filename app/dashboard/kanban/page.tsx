import { getUserData } from '@/api/auth'
import { getUserKanban } from '@/api/kanban'
import Kanban from '@/components/Kanban'

export default async function page() {
    const user: any = await getUserData()
    const kanbanData = await getUserKanban({ id: user.id })

    return (
        <div className='flex-auto p-4 h-full'>
            <Kanban kanbanData={kanbanData ?? []} />
        </div>
    )
}
