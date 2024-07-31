import { createClient } from "@/utils/supabase/client"
import Moment from "react-moment"
import moment from 'moment-timezone'
import { getUserTimezone } from "@/components/SubmitCreateHabit"
import { Habit, NivoDataset } from "@/types"

const handleArrayOfObjects = async (arr: NivoDataset[], id: number, offeredTime: string, count: number, operation: number) => {
    const supabase = createClient()

    const dataRecordsLength = arr.length

    if (arr[dataRecordsLength - 1]?.day === offeredTime) {
        let newArray = arr
        const val = newArray[dataRecordsLength - 1]?.value
        if (val + operation === 0) {
            newArray.pop()
        }
        else {
            newArray[dataRecordsLength - 1].value += operation
        }
        const { data: recordResponse, error: recordError } = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
    }
    else {
        let newArray = arr
        if (count === 0 && newArray[dataRecordsLength - 1]?.day === offeredTime) {
            const val = newArray[dataRecordsLength - 1]?.value
            newArray.push({ day: offeredTime, value: val + operation })
        }
        else if (count > 0) {
            newArray.push({ day: offeredTime, value: count })
        }
        else {
            newArray.push({ day: offeredTime, value: 1 })
        }
        const { data: recordResponse, error: recordError } = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
    }
}


export const increaseHabitCount = async ({ id, count, time }: { id: number, count: number, time: string }) => {
    const supabase = createClient()
    const timezone = getUserTimezone()

    const { data, error } = await supabase
        .from('habits')
        .update({ count: count + 1 })
        .eq('id', id)
        .select()

    const offeredTime = moment.tz(time, timezone).format('YYYY-MM-DD')
    if (data) {
        handleArrayOfObjects(data[0].records, id, offeredTime, count, 1)
    }
}
export const decreaseHabitCount = async ({ id, count, time }: { id: number, count: number, time: string }) => {
    const supabase = createClient()
    const timezone = getUserTimezone()

    const { data, error } = await supabase
        .from('habits')
        .update({ count: count - 1 })
        .eq('id', id)
        .select()
    const offeredTime = moment.tz(time, timezone).format('YYYY-MM-DD')
    if (data) {
        handleArrayOfObjects(data[0].records, id, offeredTime, count, -1)
    }
}

export const deleteHabit = async ({ id }: { id: number }) => {
    const supabase = createClient()
    const { error } = await supabase.from('habits').delete().eq('id', id)
}

export const createUserHabit = async ({ title, user, type, count, timer, timezone }: { title: string, user: string, type: string, count: number, timer?: Moment | FormDataEntryValue, timezone: string }) => {
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
        .select()
    if (data && type === 'count' && count > 0) {
        const offeredTime = moment.tz(timer, timezone).format('YYYY-MM-DD')
        handleArrayOfObjects(data[0].records, data[0].id, offeredTime, count, 0)
    }
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
    const { data, error } = await supabase.from('habits').update({ created_at: moment().format() }).eq('id', id).select()
    console.log("data == ", data)
    const timezone = getUserTimezone()
    const timer = moment().format()
    const offeredTime = moment.tz(timer, timezone).format('YYYY-MM-DD')
    if (data) {
        handleArrayOfObjects(data[0].records, id, offeredTime, data[0].count, 1)
    }
}