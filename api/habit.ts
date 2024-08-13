import { createClient } from "@/utils/supabase/server"

export const createUserHabit = async ({ title, user }: { title: string, user: string }) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .insert([
            {
                title: title,
                author_id: user
            }
        ])
}

export const getUserHabits = async ({ id }: { id: string }) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .select()
        .eq('author_id', id)

    return data
}