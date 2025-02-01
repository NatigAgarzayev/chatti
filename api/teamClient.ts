import { Participant } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { useUser } from '@clerk/nextjs'
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const createTeam = async (teamName: string, userId: string, participnatName: string) => {
    const supabase = createClient()

    const firstParticipant = [{ id: userId, name: participnatName }]
    const teamId = crypto.randomUUID()

    const res = await fetch(`${BASE_URL}/api/clerk/create-team`, {
        method: "POST",
        body: JSON.stringify({ userId, teamId }),
    }).then(res => res.json())

    if (!res.success) return

    const { data } = await supabase.from('teams').insert({ team_id: teamId, team_name: teamName, team_lead_id: userId, participants: firstParticipant })
    return data
}

export const getUserTeam = async (userId: string) => {
    const supabase = createClient()
    const res = await fetch(`${BASE_URL}/api/clerk/get-team`, {
        method: "POST",
        body: JSON.stringify({ userId }),
    }).then(res => res.json())

    if (!res.success) return
    const { data: team } = await supabase.from('teams').select("*").in('team_id', res.teams)
    return team
}

export const getUserTeamById = async (team_id: string, user_id: string) => {
    const supabase = createClient()
    const { data: team } = await supabase.from('teams').select("*").eq('team_id', team_id)
    if (team && team.length > 0) {
        const isParticipant = team[0].participants.some((participant: { id: string }) => participant.id === user_id)
        if (!isParticipant) {
            return null
        }
        else {
            return team
        }
    }
}

export const deleteTeam = async (userId: string, teamId: string) => {
    const supabase = createClient()

    const res = await fetch(`${BASE_URL}/api/clerk/delete-team`, {
        method: "POST",
        body: JSON.stringify({ userId, teamId }),
    }).then(res => res.json())

    if (!res.success) return
    const { data } = await supabase.from('teams').delete().eq('team_id', teamId)
    return data
}

export const createEvent = async (eventId: string, teamId: string, eventTitle: string, eventDescription: string, eventStart: string, eventEnd: string, eventPeople: Participant[]) => {
    const supabase = createClient()
    try {
        const { data: teamRecords } = await supabase.from('teams').select("records").eq('team_id', teamId)
        const processedStart = eventStart.replace('T', ' ')
        const processedEnd = eventEnd.replace('T', ' ')
        const newEvent = {
            id: eventId,
            title: eventTitle,
            description: eventDescription,
            start: processedStart,
            end: processedEnd,
            people: eventPeople.map((person) => person.name)
        }
        if (teamRecords && teamRecords.length >= 0) {
            const updatedRecords = [...teamRecords[0].records, newEvent]
            const { data } = await supabase.from('teams').update({ records: updatedRecords }).eq('team_id', teamId)
            return data
        } else {
            throw new Error('No team records found')
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateEvent = async (eventId: string, teamId: string, eventTitle: string, eventDescription: string, eventStart: string, eventEnd: string, eventPeople: string[]) => {
    const supabase = createClient()
    const { data } = await supabase.from('teams').select("*").eq('team_id', teamId)
    const processedStart = eventStart.replace('T', ' ')
    const processedEnd = eventEnd.replace('T', ' ')
    if (data) {
        const newRecords = {
            id: eventId,
            title: eventTitle,
            description: eventDescription,
            start: processedStart,
            end: processedEnd,
            people: eventPeople
        }
        const updatedRecords = data[0].records.map((record: { id: string }) => record.id === eventId ? newRecords : record)
        const { data: updatedData } = await supabase.from('teams').update({ records: updatedRecords }).eq('team_id', teamId)
    }
}

export const deleteEvent = async (eventId: string, teamId: number) => {
    const supabase = createClient()
    const { data } = await supabase.from('teams').select("*").eq('team_id', teamId)
    if (data) {
        const updatedRecords = data[0].records.filter((record: { id: string }) => record.id !== eventId)
        const { data: updatedData } = await supabase.from('teams').update({ records: updatedRecords }).eq('team_id', teamId)
        return updatedData
    }
}

export const joinTeamByCode = async (user: any, teamId: string) => {
    const supabase = createClient()
    const { data: team } = await supabase.from('teams').select("*").eq('team_id', teamId) // Here is the problem, it returns empty array
    if (!team) return
    if (!user) return
    if (team[0].participants.some((participant: { id: string }) => participant.id === user.id)) return
    const res = await fetch(`${BASE_URL}/api/clerk/create-team`, {
        method: "POST",
        body: JSON.stringify({ userId: user.id, teamId }),
    }).then(res => res.json())

    if (!res.success) return
    const teamList = [...team[0].participants, { id: user.id, name: user.username }]
    const { data } = await supabase.from('teams').update({ participants: teamList }).eq('team_id', teamId)
    return data
}

export const leaveTeam = async (userId: string, teamId: string) => {
    const supabase = createClient()
    const { data: team } = await supabase.from('teams').select("*").eq('team_id', teamId)
    if (!team) return
    if (!userId) return
    const res = await fetch(`${BASE_URL}/api/clerk/delete-team`, {
        method: "POST",
        body: JSON.stringify({ userId, teamId }),
    }).then(res => res.json())
    if (!res.success) return
    const teamList = team[0].participants.filter((participant: { id: string }) => participant.id !== userId)
    const { data } = await supabase.from('teams').update({ participants: teamList }).eq('team_id', teamId)
    return data
}

export const getTeamParticipants = async (teamId: string) => {
    const supabase = createClient()
    const { data } = await supabase.from('teams').select("participants, team_lead_id").eq('team_id', teamId)
    if (!data) return
    return data[0]
}