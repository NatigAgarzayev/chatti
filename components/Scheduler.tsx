'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createResizePlugin } from '@schedule-x/resize'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import CreateEvent from './CreateEvent'
import { Event, Team } from '@/types'
import { updateEvent } from '@/api/teamClient'
import { useMutation } from '@tanstack/react-query'
import CustomEventModal from './CustomEventModal'
import { useStore } from '@/store/store'
import EditEvent from './EditEvent'
import { useRouter } from 'next/navigation'

export default function Scheduler({ team }: { team: Team }) {
    const router = useRouter()
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0]
    const theme = window.localStorage.getItem('theme')
    const [eventObj, setEventObj] = useState<any>({
        calendarId: '',
        description: '',
        end: '',
        id: '',
        start: '',
        title: '',
        people: []
    })
    const editEventId = useStore(state => state.editEventId)
    const editEventModal = useStore(state => state.editEventModal)
    const plugins = [eventsServicePlugin, createDragAndDropPlugin(), createEventModalPlugin(), createCurrentTimePlugin(), createResizePlugin()]
    const deleteEventId = useStore(state => state.deleteEventId)
    const mutation = useMutation({
        mutationFn: async ({ updatedEvent }: { updatedEvent: any }) => {
            await updateEvent(updatedEvent.id, team.team_id, updatedEvent.title, updatedEvent.description as string, updatedEvent.start, updatedEvent.end, updatedEvent.people)
        },
        onSuccess: (data, variables) => {
            const processedStart = variables.updatedEvent.start.replace('T', ' ')
            const processedEnd = variables.updatedEvent.end.replace('T', ' ')
            eventsServicePlugin.update({
                title: variables.updatedEvent.title,
                start: processedStart,
                end: processedEnd,
                id: variables.updatedEvent.id,
                description: variables.updatedEvent.description,
                people: variables.updatedEvent.people
            })
        }
    })
    const calendar = useNextCalendarApp(
        {
            views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
            events: team?.records.map((record: any) => ({
                title: record.title,
                start: record.start,
                end: record.end,
                id: record.id,
                description: record.description,
                people: record.people
            })),
            isDark: theme === 'dark',
            callbacks: {
                onEventUpdate: (updatedEvent) => {
                    mutation.mutate({
                        updatedEvent: updatedEvent
                    })
                }
            },
        },
        plugins
    )

    useEffect(() => {
        if (deleteEventId) {
            eventsServicePlugin.remove(deleteEventId)
        }
    }, [deleteEventId])

    useEffect(() => {
        if (editEventModal) {
            const eventObject = eventsServicePlugin.get(editEventId)
            setEventObj(eventObject)
        }
    }, [editEventModal])

    return (
        <div className='w-[90%] mx-auto'>
            <div className='flex items-center gap-2 mt-5'>
                <button onClick={() => router.push('/dashboard/team/')} className='flex items-center gap-2 text-blue-500 rounded-md p-2 bg-gray-500/10 hover:bg-gray-500/20 transition-all duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-from-line"><path d="m9 6-6 6 6 6" /><path d="M3 12h14" /><path d="M21 19V5" /></svg>
                </button>
                <CreateEvent teamId={team?.team_id} teamParticipants={team.participants} calendar={calendar} />
            </div>

            <EditEvent eventObj={eventObj} teamId={team.team_id} teamParticipants={team.participants} eventsServicePlugin={eventsServicePlugin} />
            <ScheduleXCalendar calendarApp={calendar} customComponents={{ eventModal: CustomEventModal }} />
        </div>
    )
}
