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

export const getUserHabits = async ({ id }: { id: number }) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .select()
        .eq('author_id', id)

    return data
}

export const increaseHabitCount = async ({ id, count }: { id: number, count: number }) => {
    const supabase = createClient()

    const { error } = await supabase
        .from('habits')
        .update({ count: count + 1 })
        .eq('id', id)

}
export const decreaseHabitCount = async ({ id, count }: { id: number, count: number }) => {
    const supabase = createClient()

    const { error } = await supabase
        .from('habits')
        .update({ count: count - 1 })
        .eq('id', id)

}