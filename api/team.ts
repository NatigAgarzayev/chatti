import { createClient } from "@/utils/supabase/server"

export const getUserTeam = async (user_id: string) => {
    const supabase = createClient()
    const { data: team } = await supabase.from('teams').select("*").eq('team_lead_id', user_id)
    return team
}
