'use client'
import { InputMask, type MaskEventDetail } from '@react-input/mask'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import resetBtn from "../images/reset.svg"
import Image from 'next/image';
import pauseIcon from "../images/pause-icon.svg"
import playIcon from "../images/play-icon.svg"
import editIcon from "../images/edit-icon.svg"
import "moment-duration-format"
export default function Timer() {

    const [detail, setDetail] = useState<MaskEventDetail | null>(null);
    const [val, setVal] = useState('')
    const fRef = useRef<HTMLInputElement>(null)
    const [isTimerOn, setIsTimerOn] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [count, setCount] = useState(60)
    const [initialTime, setInitialTime] = useState(0)


    useEffect(() => {
        if (fRef.current) {
            fRef.current.focus()
        }
    }, [])

    let interval: any
    useEffect(() => {
        if (!isPaused) {
            interval = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount <= 1) {
                        clearInterval(interval)
                        return 0
                    }
                    return prevCount - 1
                })
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isPaused]);

    const handleReset = () => {
        // setIsTimerOn(false)
        setCount(initialTime)
        setIsPaused(true)
        // setDetail({ value: '', isValid: false })
        // if (fRef.current) {
        //     fRef.current.focus()
        // }
    }

    const handlePlay = () => {
        if (!isTimerOn) {
            setIsTimerOn(true)
            const vals = detail?.value.split(" : ")
            if (vals) {
                const hours = +vals[0]
                const minutes = +vals[1]
                const seconds = +vals[2]
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
        setDetail({ value: '', isValid: false })
        if (fRef.current) {
            fRef.current.focus()
        }
    }

    const handlePause = () => {
        setIsPaused(true)
        // clearInterval(interval)
    }

    const DisplayTime = () => {
        // return moment().hour(0).minute(0).second(count).format('HH : mm : ss')
        return moment.duration(count, 'seconds').format('HH : mm : ss', { trim: false })
    }

    return (
        <div>
            {
                !isTimerOn ?
                    <InputMask
                        ref={fRef}
                        className='text-[96px] bg-transparent w-[525px] outline-none text-gray-700 text-center'
                        mask="__ : __ : __"
                        replacement={{ _: /\d/ }}
                        value={detail?.value ?? ''}
                        onMask={(event) => setDetail(event.detail)}
                        onChange={() => setVal(detail?.value ?? '')}
                        placeholder='00 : 00 : 00'
                    />
                    :
                    <div className='text-[96px] text-gray-700' >
                        <DisplayTime />
                    </div>
            }
            <div className='flex gap-4 items-center justify-center mt-5'>
                <div onClick={handleEdit} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer'>
                    <Image src={editIcon} width={32} height={32} alt='' className='text-4xl' />
                </div>
                <div onClick={handleReset} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer'>
                    <Image src={resetBtn} width={32} height={32} alt='' className='text-4xl' />
                </div>
                {
                    isPaused ?
                        <button disabled={!detail?.isValid} onClick={handlePlay} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer disabled:bg-indigo-200'>
                            <Image src={playIcon} width={32} height={32} alt='' className='text-4xl' />
                        </button>
                        :
                        <div onClick={handlePause} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer'>
                            <Image src={pauseIcon} width={32} height={32} alt='' className='text-4xl' />
                        </div>
                }
            </div>
        </div>
    )
}
