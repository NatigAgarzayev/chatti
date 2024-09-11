import { createClient } from "@/utils/supabase/client"

export const getUserKanban = async ({ id }: { id: string }) => {
    const supabase = createClient()
    
    const { data: kanban, error } = await supabase
        .from('kanban')
        .select("*")
        .eq('author_id', id)
    return kanban
}

export const createTask = async (task: string, author_id: string) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('kanban')
        .insert([
            {
                content: task,
                author_id: author_id,
                progress: 1,
            },
        ])
}

export const deleteTask = async (id: number) => {
    const supabase = createClient()
    const { error } = await supabase.from('kanban').delete().eq('id', id)
}

export const updateTaskProgress = async (id: number, progress: number) => {
    const supabase = createClient()

    const { error } = await supabase
        .from('kanban')
        .update({
            progress: progress,
        })
        .eq('id', id)
}

export const getQuillContent = async (id: number) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("kanban")
        .select("*")
        .eq("id", id)

    if (data) {
        return data[0].content
    }
}

export const updateQuillContent = async (id: number, content: string) => {
    const supabase = createClient()
    const { error } = await supabase
        .from('kanban')
        .update({
            content: content,
        })
        .eq('id', id)
}