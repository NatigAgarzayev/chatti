'use client'
import React from 'react'
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

export default function Scheduler({ team }: { team: Team }) {
    const plugins = [createEventsServicePlugin(), createDragAndDropPlugin(), createEventModalPlugin(), createCurrentTimePlugin(), createResizePlugin()]
    const eventsServicePlugin = createEventsServicePlugin();
    const mutation = useMutation({
        mutationFn: async ({ updatedEvent }: { updatedEvent: Event }) => {
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
                people: variables.updatedEvent.people || []
            })
        }
    })
    const calendar = useNextCalendarApp(
        {
            views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
            events: team.records,
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

    return (
        <div className=''>
            <CreateEvent teamId={team.team_id} teamParticipants={team.participants} calendar={calendar} />
            <ScheduleXCalendar calendarApp={calendar} customComponents={{ eventModal: CustomEventModal }} />
        </div>
    )
}
