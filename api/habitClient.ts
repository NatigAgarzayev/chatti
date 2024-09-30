import { createClient } from "@/utils/supabase/client"
import Moment from "react-moment"
import moment from 'moment-timezone'
import { getUserTimezone } from "@/components/SubmitCreateHabit"
import { NivoDataset } from "@/types"

const handleArrayOfObjects = async (arr: NivoDataset[], id: number, offeredTime: string, count: number, operation: number) => {
    const supabase = createClient()

    const dataRecordsLength = arr.length

    if (arr[dataRecordsLength - 1]?.day === offeredTime) {
        // when we already have record for the same 
        console.log("asdasdasdasdasdasd")
        let newArray = arr
        const val = newArray[dataRecordsLength - 1]?.value
        if (val + operation <= 0) {
            return
        }
        else {
            newArray[dataRecordsLength - 1].value = val + operation
        }
        const { data: recordResponse, error: recordError } = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
    }
    else {
        let newArray = arr
        console.log("newarr = ", newArray)
        if (newArray.length === 0) {
            console.log("asd2")
            newArray.push({ day: offeredTime, value: count + operation })
        }
        else if (newArray.length > 0 && newArray[dataRecordsLength - 1]?.day !== offeredTime) {
            console.log("asd3")
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
        const newArray = data[0].records
        const dataRecordsLength = newArray.length

        const val = newArray[dataRecordsLength - 1]?.value
        if (val - 1 <= 0) {
            newArray.pop()
        }
        else {
            newArray[dataRecordsLength - 1].value = val - 1
        }

        const { data: recordResponse, error: recordError } = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
        // handleArrayOfObjects(data[0].records, id, offeredTime, count, -1)
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
    return data
}

export const getUserHabits = async ({ id }: { id: string }) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .select()
        .eq('author_id', id)
        .select()
    
    console.log("data == ", data)

    return data
}

export const getUserHabitById = async ({id}: {id: number}) => {
    const supabase = createClient()

    const {data} = await supabase
    .from('habits')
    .select()
    .eq('id', id)

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

    return data
}

export const updateHabit = async ({id, title, type, created_at, habitRecord, actionType, addCount}: {id:number, title: string, type: string, created_at: string, habitRecord: Array<any>, actionType: string, addCount: number}) => {
    const supabase = createClient()
    if(type === "timer") {
        const {data} = await supabase.from('habits')
        .update({
            title: title,
            created_at: created_at
        })
        .eq("id", id)
        .select()
        
        return data
    }
    else {
        let countOperation = 0
        console.log(habitRecord)
        let arrayToPush: any[] = []
        const {data: dataR} = await supabase.from('habits').select().eq('id', id)
        if(dataR){
            arrayToPush = dataR[0].records
            countOperation = dataR[0].count
        }
        else return

        if(actionType === "add" && arrayToPush.length > 0){
            let count = 0
            if(dataR){
                arrayToPush.forEach((item: any) => {
                    if(item.day === habitRecord[count].day){
                        item.value = item.value + addCount
                        countOperation += addCount
                        count += 1
                    }
                })
                arrayToPush = dataR[0].records
            }
        }
        else if(actionType === "delete" && arrayToPush.length > 0){
            if(dataR){
                console.log("worked for delete")

                habitRecord.forEach((el: {day: string, value: number}) => {
                    arrayToPush = arrayToPush.filter((item: {day: string, value: number}) => item.day !== el.day)        
                    countOperation -= el.value                
                })
                console.log(arrayToPush)
            }
        }
        const {data, error} = await supabase.from('habits')
        .update({
            title: title,
            records: arrayToPush,
            count: countOperation,
        })
        .eq("id", id)
        .select()

        return data
    }
}

export const confirmNotToday = async ({id, created_at, addCount}: {id: number, created_at: string, addCount: number}) => {
    const supabase = createClient()
    const {data: dataR} = await supabase.from('habits').select().eq('id', id)

    const timezone = getUserTimezone()
    const offeredTime = moment.tz(created_at, timezone).format('YYYY-MM-DD')

    let newArray = []
    let countPlus = 0
    if(dataR){
        countPlus = dataR[0].count + addCount
        newArray = dataR[0].records
    }
    newArray.push({ day: offeredTime, value: addCount })

    const { data, error } = await supabase
        .from('habits')
        .update({ records: newArray, count: countPlus })
        .eq('id', id)
        .select()
    return data
}