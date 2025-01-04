import { getUserTimezone } from "@/components/SubmitCreateHabit"
import { createClient } from "@/utils/supabase/client"
import moment from 'moment-timezone'
export const getUserKanban = async ({ id }: { id: string }) => {
    const supabase = createClient()

    const { data: kanban } = await supabase
        .from('kanban')
        .select("*")
        .eq('author_id', id)
    return kanban
}

export const createTask = async ({ task, deadline, author_id }: { task: string, deadline: string, author_id: string }) => {
    const supabase = createClient()
    const timezone = getUserTimezone()

    const { } = await supabase
        .from('kanban')
        .insert([
            {
                content: task,
                deadline: moment.tz(deadline, timezone) || null,
                author_id: author_id,
                progress: 1,
            },
        ])
}

export const deleteTask = async (id: number) => {
    const supabase = createClient()
    const { } = await supabase.from('kanban').delete().eq('id', id)
}

export const updateTaskProgress = async (id: number, progress: number) => {
    const supabase = createClient()

    const { } = await supabase
        .from('kanban')
        .update({
            progress: progress,
        })
        .eq('id', id)
}

export const getQuillContent = async (id: number) => {
    const supabase = createClient()

    const { data } = await supabase
        .from("kanban")
        .select("*")
        .eq("id", id)

    if (data) {
        return data[0]
    }
}

export const updateQuillContent = async ({ id, content, deadline }: { id: number, content: string, deadline: string }) => {
    const supabase = createClient()
    const timezone = getUserTimezone()
    const { } = await supabase
        .from('kanban')
        .update({
            content: content,
            deadline: moment.tz(deadline, timezone) || null,
        })
        .eq('id', id)
}