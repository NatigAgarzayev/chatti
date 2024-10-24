import {createClient} from "@/utils/supabase/client"
import Moment from "react-moment"
import moment from 'moment-timezone'
import momentReal from 'moment'
import {getUserTimezone} from "@/components/SubmitCreateHabit"
import {NivoDataset} from "@/types"

const handleArrayOfObjects = async (arr: NivoDataset[], id: number, offeredTime: string, count: number, operation: number) => {
    const supabase = createClient()

    const dataRecordsLength = arr.length

    if (arr[dataRecordsLength - 1]?.day === offeredTime) {
        // when we already have recorded for the same
        let newArray = arr
        const val = newArray[dataRecordsLength - 1]?.value
        if (val + operation <= 0) {
            return
        }
        else {
            newArray[dataRecordsLength - 1].value = val + operation
        }
        const { } = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
    }
    else {
        let newArray = arr
        if (newArray.length === 0) {
            newArray.push({ day: offeredTime, value: count + operation })
        }
        else if (newArray.length > 0 && newArray[dataRecordsLength - 1]?.day !== offeredTime) {
            newArray.push({ day: offeredTime, value: 1 })
        }
        const {} = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
    }
}


export const increaseHabitCount = async ({ id, count, time }: { id: number, count: number, time: string }) => {
    const supabase = createClient()
    const timezone = getUserTimezone()

    const { data } = await supabase
        .from('habits')
        .update({ count: count + 1 })
        .eq('id', id)
        .select()

    const offeredTime = moment.tz(time, timezone).format('YYYY-MM-DD')
    if (data) {
        await handleArrayOfObjects(data[0].records, id, offeredTime, count, 1)
    }
}
export const decreaseHabitCount = async ({ id, count }: { id: number, count: number}) => {
    const supabase = createClient()

    const { data } = await supabase
        .from('habits')
        .update({ count: count - 1 })
        .eq('id', id)
        .select()
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

        const { } = await supabase
            .from('habits')
            .update({ records: newArray })
            .eq('id', id)
    }
}

export const deleteHabit = async ({ id }: { id: number }) => {
    const supabase = createClient()
    const { } = await supabase.from('habits').delete().eq('id', id)
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
        await handleArrayOfObjects(data[0].records, data[0].id, offeredTime, count, 0)
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
    const {data: timeCreated} = await supabase.from('habits').select('created_at').eq('id', id)
    const { data } = await supabase.from('habits').update({ created_at: moment().format()}).eq('id', id).select()
    let maxStreak = 0
    if(data && data[0].records.length >= 2){
        //adding streak: calculating the difference between last to records and identifying a maximum streak value
        const habitRecords = [...data[0].records]
        const lastTime = momentReal(habitRecords.pop().day.split('-').map((item: string) => +item))
        const secondLastTime = momentReal(habitRecords.pop().day.split('-').map((item: string) => +item))
        const result = lastTime.diff(secondLastTime, 'days')
        maxStreak = Math.max(result, data[0].streak)
        const {} = await supabase.from('habits').update({streak: maxStreak || 0}).eq('id', id)
    }
    const timezone = getUserTimezone()
    const timer = moment().format()
    const offeredTime = moment.tz(timer, timezone).format('YYYY-MM-DD')
    if (data) {
        await handleArrayOfObjects(data[0].records, id, offeredTime, data[0].count, 1)
    }
    const { data: dataR } = await supabase.from('habits').select('*').eq('id', id)
    //Also implement logic for data[0].records.length === 1
    if(dataR && timeCreated && dataR[0].records.length === 1){
        const habitRecords = [...dataR[0].records]
        const singleRecord = momentReal(habitRecords.pop().day.split('-').map((item: string) => +item))
        const result = singleRecord.diff(momentReal(timeCreated[0].created_at).format('YYYY-MM-DD').split('-').map((item: string) => +item), 'days')
        maxStreak = Math.max(result, dataR[0].streak)
        const {} = await supabase.from('habits').update({streak: maxStreak || 0}).eq('id', id)
    }
    return dataR
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
                habitRecord.forEach((el: {day: string, value: number}) => {
                    arrayToPush = arrayToPush.filter((item: {day: string, value: number}) => item.day !== el.day)        
                    countOperation -= el.value                
                })
            }
        }
        const {data} = await supabase.from('habits')
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

    const { data } = await supabase
        .from('habits')
        .update({ records: newArray, count: countPlus })
        .eq('id', id)
        .select()
    return data
}

export const handlePinnedCondition = async ({id, pinned}: {id: number, pinned: boolean}) => {
    const supabase = createClient()
    const {data} = await supabase.from('habits').update({pinned: pinned}).eq('id', id).select()
    return data
}