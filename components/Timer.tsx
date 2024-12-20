'use client'
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react'
import resetBtn from "../public/images/reset.svg"
import Image from 'next/image';
import pauseIcon from "../public/images/pause-icon.svg"
import playIcon from "../public/images/play-icon.svg"
import editIcon from "../public/images/edit-icon.svg"
import "moment-duration-format"
import {motion} from "framer-motion"

export default function Timer() {

    const endSound = new Audio("/audio/notify.mp3")

    const [isTimerOn, setIsTimerOn] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [count, setCount] = useState(60)
    const [initialTime, setInitialTime] = useState(0)
    const [values, setValues] = useState({ val1: '', val2: '', val3: '' })
    const valRef1 = useRef<HTMLInputElement>(null)
    const valRef2 = useRef<HTMLInputElement>(null)
    const valRef3 = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (valRef1.current) {
            valRef1.current.focus()
        }
    }, [])

    let interval: any
    useEffect(() => {
        if (!isPaused) {
            interval = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount === 1) {
                        endSound.play()
                    }
                    if (prevCount <= 0) {
                        clearInterval(interval)
                        setIsPaused(true)
                        setCount(initialTime)
                        return 0
                    }
                    return prevCount - 1
                })
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isPaused]);

    const handleReset = () => {
        setCount(initialTime)
        setIsPaused(true)
    }

    const handlePlay = () => {
        if (!isTimerOn) {
            setIsTimerOn(true)
            if (values) {
                const hours = +values.val1
                const minutes = +values.val2
                const seconds = +values.val3
                const res = hours * 3600 + minutes * 60 + seconds
                setCount(res)
                setInitialTime(res)
            }
        }
        setIsPaused(false)

    }

    const handleEdit = () => {
        setIsTimerOn(false)
        setIsPaused(true)
        setCount(0)
        setValues({ val1: '', val2: '', val3: '' })
        setTimeout(() => {
            if (valRef1.current) {
                valRef1.current.focus()
            }
        }, 100)
    }

    const handlePause = () => {
        setIsPaused(true)
    }

    const DisplayTime = () => {
        // return moment().hour(0).minute(0).second(count).format('HH : mm : ss')
        const res = moment.duration(count, 'seconds').format('HH : mm : ss', { trim: false })
        document.title = res + " - Chatti"
        return res
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            {
                !isTimerOn ?
                    <div className='flex gap-0 md:gap-4 items-center dark:text-gray-200'>
                        <input onKeyDown={(event) => {
                            if (event.key === 'Enter' && isPaused && (values.val1 || values.val2 || values.val3)) {
                                handlePlay()
                            }
                            if (event.key === 'Backspace' && !valRef1.current?.value) {
                                valRef3.current?.focus()
                            }
                        }} ref={valRef1} value={values.val1} onChange={(e) => {
                            setValues(prev => ({ ...prev, val1: e.target.value.replace(/[^0-9]/g, '') }))
                            if (e.target.value.length === 2) {
                                valRef2.current?.focus()
                            }
                        }

                        } type="text" maxLength={2} className='text-4xl md:text-[96px] text-center bg-transparent w-[64px] md:w-[125px] outline-none text-gray-700 dark:text-gray-200' placeholder='00' />
                        <div className='text-[48px]'>:</div>
                        <input onKeyDown={(event) => {
                            if (event.key === 'Enter' && isPaused && (values.val1 || values.val2 || values.val3)) {
                                handlePlay()
                            }
                            if (event.key === 'Backspace' && !valRef2.current?.value) {
                                valRef1.current?.focus()
                            }
                        }} ref={valRef2} value={values.val2} onChange={(e) => {

                            setValues(prev => ({ ...prev, val2: e.target.value.replace(/[^0-9]/g, '') }))
                            if (e.target.value.length === 2) {
                                valRef3.current?.focus()
                            }
                        }} type="text" maxLength={2} className='text-4xl md:text-[96px] text-center bg-transparent w-[64px] md:w-[125px] outline-none text-gray-700 dark:text-gray-200' placeholder='00' />
                        <div className='text-[48px] flex align-baseline'>:</div>
                        <input onKeyDown={(event) => {
                            console.log(event.key)
                            if (event.key === 'Enter' && isPaused && (values.val1 || values.val2 || values.val3)) {
                                handlePlay()
                            }
                            if (event.key === 'Backspace' && !valRef3.current?.value) {
                                valRef2.current?.focus()
                            }
                        }} ref={valRef3} value={values.val3} onChange={(e) => {
                            setValues(prev => ({ ...prev, val3: e.target.value.replace(/[^0-9]/g, '') }))
                        }} type="text" maxLength={2} className='text-4xl md:text-[96px] text-center bg-transparent w-[64px] md:w-[125px] outline-none text-gray-700 dark:text-gray-200' placeholder='00' />
                    </div>
                    :
                    <div className='text-4xl xl:text-[96px] text-gray-700 dark:text-gray-200 timer-tabular'>
                        <DisplayTime />
                    </div>
            }
            <div className='flex gap-4 items-center mt-5 justify-center xl:mt-10'>
                <div onClick={handleEdit} className='p-4 rounded-3xl bg-indigo-400 dark:bg-gray-200 w-fit cursor-pointer'>
                    <Image src={editIcon} width={32} height={32} alt='' className='text-4xl' />
                </div>
                <div onClick={handleReset} className='p-4 rounded-3xl bg-indigo-400 dark:bg-gray-200 w-fit cursor-pointer'>
                    <Image src={resetBtn} width={32} height={32} alt='' className='text-4xl' />
                </div>
                {
                    isPaused ?
                        <button disabled={values.val1 === '' && values.val2 === '' && values.val3 === ''} type='submit' onClick={handlePlay} className='p-4 rounded-3xl bg-indigo-400 dark:bg-gray-200 w-fit cursor-pointer dark:disabled:bg-gray-400 disabled:bg-indigo-200'>
                            <Image src={playIcon} width={32} height={32} alt='' className='text-4xl' />
                        </button>
                        :
                        <div onClick={handlePause} className='p-4 rounded-3xl bg-indigo-400 dark:bg-gray-200 w-fit cursor-pointer'>
                            <Image src={pauseIcon} width={32} height={32} alt='' className='text-4xl' />
                        </div>
                }
            </div>
        </motion.div >
    )
}
