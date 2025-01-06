import { createClient } from "@/utils/supabase/client"
import { verify } from 'jsonwebtoken'
export const createTeam = async (teamName: string, userId: string, participant_name: string) => {
    const supabase = createClient()
    const { data: existingTeam } = await supabase.from('teams').select('participants').eq('team_lead_id', userId).single()

    let participants = []
    if (existingTeam && existingTeam.participants) {
        participants = existingTeam.participants
    }
    participants.push({ id: userId, name: participant_name })

    const { data } = await supabase.from('teams').insert({ team_name: teamName, team_lead_id: userId, participants: participants })
    return data
}

/* export const joinTeam = async (teamName: string, userId: string, invitationCode: string) => {
    const supabase = createClient()

} */
