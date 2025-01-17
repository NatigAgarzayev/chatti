'use client'
import { deleteEvent } from '@/api/teamClient';
import { useStore } from '@/store/store';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

export default function CustomEventModal({ calendarEvent }: { calendarEvent: any }) {
    console.log("calendarEvent", calendarEvent)

    const { slug } = useParams()
    const updateDeleteEventId = useStore(state => state.updateDeleteEventId)

    const deleteEventMutation = useMutation({
        mutationFn: async (id: string) => {
            await deleteEvent(id, +slug)
        },
        onSuccess: (data, variables) => {
            updateDeleteEventId(variables)
        }
    })


    const deleteEventHandler = async (id: string) => {
        deleteEventMutation.mutate(id)
    }

    return (
        <ul className='border border-gray-200 rounded-md shadow-md bg-white overflow-hidden'>
            <li className='flex items-center gap-2 py-2 px-4'>
                <span className='text-lg font-bold'>{calendarEvent.title}</span>
            </li>
            <li className='flex items-center gap-2 py-1 px-4'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <span className='text-sm text-gray-500'>{calendarEvent.start} - {calendarEvent.end}</span>
            </li>
            <li className='flex items-center gap-2 py-1 px-4'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /></svg>
                </div>
                <span className='text-md text-gray-500'>{calendarEvent.people.join(', ')}</span>
            </li>
            <li className='flex items-center gap-2 py-1 px-4'>
                <div className='mb-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-text"><path d="M17 6.1H3" /><path d="M21 12.1H3" /><path d="M15.1 18H3" /></svg>
                </div>
                <span className='text-sm text-gray-500'>{calendarEvent.description}</span>
            </li>
            <li className='flex items-center gap-2 py-1 px-4 justify-end'>
                <button className='flex items-center gap-2 text-blue-500 rounded-md p-2 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                </button>
                <button onClick={() => deleteEventHandler(calendarEvent.id)} className='flex items-center gap-2 text-red-500 rounded-md p-2 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                </button>
            </li>
        </ul>
    )
}
