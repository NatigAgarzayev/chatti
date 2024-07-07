import { createClient } from "@/utils/supabase/client"

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

export const deleteHabit = async ({ id }: { id: number }) => {
    const supabase = createClient()
    const { error } = await supabase.from('habits').delete().eq('id', id)
}

export const createUserHabit = async ({ title, user, type }: { title: string, user: string, type: string }) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .insert([
            {
                title: title,
                author_id: user,
                type: type,
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