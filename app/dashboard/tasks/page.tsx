import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Tasks from '@/components/Tasks'

export default async function page() {
    const user = await currentUser()

    if (!user) {
        return redirect("/sign-in")
    }

    return (
        <>
            <Tasks user={JSON.parse(JSON.stringify(user))} />
        </>
    )
}
