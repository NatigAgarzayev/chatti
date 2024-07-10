import { createClient } from "@/utils/supabase/client"
import Moment from "react-moment"
import moment from 'moment-timezone'

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

export const createUserHabit = async ({ title, user, type, count, timer, timezone }: { title: string, user: string, type: string, count?: number | undefined, timer?: Moment | FormDataEntryValue, timezone: string }) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .insert([
            {
                title: title,
                author_id: user,
                type: type,
                created_at: type === 'timer' ? moment.tz(timer, timezone).format() : moment().format(),
                count: type === 'timer' ? 0 : count,
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


export const resetTimerHabit = async ({ id }: { id: number }) => {
    const supabase = createClient()
    const { error } = await supabase.from('habits').update({ created_at: moment().format() }).eq('id', id)
}