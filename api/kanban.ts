import { createClient } from "@/utils/supabase/server"

export const getUserKanban = async ({ id }: { id: string }) => {
    const supabase = createClient()

    const { data: kanban } = await supabase
        .from('kanban')
        .select("*")
        .eq('author_id', id)
    return kanban
}