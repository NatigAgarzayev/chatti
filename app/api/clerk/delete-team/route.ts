import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
    const { userId, teamId } = await request.json()
    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user) return NextResponse.json({ success: false })

    const teamList = (user.publicMetadata.teams as string[]) || []
    teamList.splice(teamList.indexOf(teamId), 1)
    const res = await client.users.updateUserMetadata(userId, {
        publicMetadata: {
            teams: teamList
        },
    })

    return NextResponse.json({ success: true })
}