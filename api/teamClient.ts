import { Participant } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { verify } from 'jsonwebtoken'
export const createTeam = async (teamName: string, userId: string, participnatName: string) => {
    const supabase = createClient()

    const firstParticipant = [{ id: userId, name: participnatName }]

    const { data } = await supabase.from('teams').insert({ team_name: teamName, team_lead_id: userId, participants: firstParticipant })
    return data
}

export const getUserTeam = async (user_id: string) => {
    const supabase = createClient()
    const { data: team } = await supabase.from('teams').select("*").eq('team_lead_id', user_id)
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

export const createEvent = async (eventId: string, teamId: number, eventTitle: string, eventDescription: string, eventStart: string, eventEnd: string, eventPeople: Participant[]) => {
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

export const updateEvent = async (eventId: string, teamId: number, eventTitle: string, eventDescription: string, eventStart: string, eventEnd: string, eventPeople: string[]) => {
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
