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