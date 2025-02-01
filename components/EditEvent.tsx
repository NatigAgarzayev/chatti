'use client'
import { updateEvent } from '@/api/teamClient'
import { useStore } from '@/store/store'
import { Participant, Event } from '@/types'
import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'



export default function EditEvent({ eventObj, teamId, teamParticipants, eventsServicePlugin }: { eventObj: Event, teamId: string, teamParticipants: Participant[], eventsServicePlugin: any }) {

    const [selectedPeople, setSelectedPeople] = useState(eventObj.people)
    console.log("eventPEOPLE", eventObj.people)

    const updateEditEventModal = useStore(state => state.updateEditEventModal)
    const editEventId = useStore(state => state.editEventId)
    const editEventModal = useStore(state => state.editEventModal)

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const startDateRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (eventObj && titleRef.current && descriptionRef.current && startDateRef.current && endDateRef.current) {
            titleRef.current.value = eventObj.title
            descriptionRef.current.value = eventObj.description
            startDateRef.current.value = eventObj.start
            endDateRef.current.value = eventObj.end
            setSelectedPeople(eventObj.people)
        }
    }, [eventObj])


    const mutation = useMutation({
        mutationFn: async ({ eventId, eventTitle, eventDescription, eventStart, eventEnd, selectedPeople }: { eventId: string, eventTitle: string, eventDescription: string, eventStart: string, eventEnd: string, selectedPeople: string[] }) => {
            await updateEvent(eventId, teamId, eventTitle, eventDescription, eventStart, eventEnd, selectedPeople)
        },
        onSuccess: (data, variables) => {
            const processedStart = variables.eventStart.replace('T', ' ')
            const processedEnd = variables.eventEnd.replace('T', ' ')
            eventsServicePlugin.update({
                title: variables.eventTitle,
                start: processedStart,
                end: processedEnd,
                id: variables.eventId,
                description: variables.eventDescription,
                people: variables.selectedPeople
            })
            updateEditEventModal(false)
        }
    })

    const editEventHandler = (formData: FormData) => {
        const eventTitle = formData.get('eventTitle') as string
        const eventDescription = formData.get('eventDescription') as string
        const eventStart = formData.get('eventStart') as string
        const eventEnd = formData.get('eventEnd') as string
        const eventId = crypto.randomUUID()
        mutation.mutate({
            eventId: eventObj.id,
            eventTitle,
            eventDescription,
            eventStart,
            eventEnd,
            selectedPeople
        })
    }

    const handleListOfAssignes = (val: any) => {
        const candidateToAdd = val[val.length - 1].name
        if (!selectedPeople.includes(candidateToAdd)) {
            setSelectedPeople([...selectedPeople, candidateToAdd])
        }
        else {
            setSelectedPeople(selectedPeople.filter((person) => person !== candidateToAdd))
        }
    }

    return (
        <Dialog open={editEventModal} onClose={() => updateEditEventModal(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <DialogPanel className="md:w-[520px] w-[340px] space-y-4 border bg-white dark:bg-gray-800 dark:border-gray-400 p-6 rounded-3xl text-center">
                        <DialogTitle className="font-bold text-xl dark:text-white">Update the event <br /> ({editEventId})</DialogTitle>
                        <form action={editEventHandler} className="flex flex-col gap-3 justify-center">
                            <input ref={titleRef} required name='eventTitle' type="text" maxLength={30} placeholder='Event title' className='px-4 py-2 border border-gray-300 rounded-3xl' />
                            <textarea ref={descriptionRef} required name='eventDescription' maxLength={200} placeholder='Event description' className='outline-none px-4 py-2 border border-gray-300 rounded-3xl resize-none' />
                            <label htmlFor='eventStart' className='text-gray-700 dark:text-white'>Event start</label>
                            <input ref={startDateRef} required name='eventStart' type="datetime-local" placeholder='Event start' className='px-4 py-2 border border-gray-300 rounded-3xl' />
                            <label htmlFor='eventEnd' className='text-gray-700 dark:text-white'>Event end</label>
                            <input ref={endDateRef} required name='eventEnd' type="datetime-local" placeholder='Event end' className='px-4 py-2 border border-gray-300 rounded-3xl' />
                            <label htmlFor='eventPeople' className='text-gray-700 dark:text-white'>Assign people</label>
                            <Listbox value={selectedPeople} onChange={handleListOfAssignes} multiple>
                                {
                                    selectedPeople.length === 0 ?
                                        <ListboxButton className='px-4 py-2 border border-gray-300 rounded-3xl'>No assigns</ListboxButton>
                                        :
                                        <ListboxButton className='px-4 py-2 border border-gray-300 rounded-3xl'>{selectedPeople.join(', ')}</ListboxButton>
                                }
                                <ListboxOptions className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-3xl' anchor="top">
                                    {teamParticipants.map((person) => (
                                        <ListboxOption key={person.id} value={person} className="data-[focus]:bg-indigo-300 cursor-pointer">
                                            {person.name}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Listbox>
                            <button disabled={mutation.isPending} type='submit' className='text-gray-700 px-4 py-2 dark:bg-gray-100 bg-indigo-400 font-bold rounded-3xl disabled:bg-indigo-300' >{mutation.isPending ? 'Updating...' : 'Update'}</button>
                            <button className='px-4 py-2 font-bold border border-gray-300 rounded-3xl  dark:text-white' onClick={() => updateEditEventModal(false)}>Cancel</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
