'use client'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import resetBtn from "../public/images/reset.svg"
import Image from 'next/image';
import pauseIcon from "../public/images/pause-icon.svg"
import playIcon from "../public/images/play-icon.svg"

export default function Stopwatch() {

    const [isPaused, setIsPaused] = useState(true)
    const [count, setCount] = useState(0)

    let interval: any
    useEffect(() => {
        if (!isPaused) {
            interval = setInterval(() => {
                setCount(count => count + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isPaused]);

    const handleReset = () => {
        setIsPaused(true)
        clearInterval(interval)
        setCount(0)
    }

    const handlePlay = () => {
        setIsPaused(false)

    }

    const handlePause = () => {
        setIsPaused(true)
        clearInterval(interval)
    }

    const DisplayTime = () => {
        const res = moment().hour(0).minute(0).second(count).format('HH : mm : ss')
        document.title = res + " - Chatti"
        return res
    }


    return (
        <div>
            <div className='text-[96px] text-center text-gray-700'>
                {
                    <DisplayTime />
                }
            </div>
            <div className='flex gap-4 items-center justify-center mt-5'>
                <div onClick={handleReset} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer'>
                    <Image src={resetBtn} width={32} height={32} alt='' className='text-4xl' />
                </div>
                {
                    isPaused ?
                        <div onClick={handlePlay} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer'>
                            <Image src={playIcon} width={32} height={32} alt='' className='text-4xl' />
                        </div>
                        :
                        <div onClick={handlePause} className='p-4 rounded-3xl bg-indigo-400 w-fit cursor-pointer'>
                            <Image src={pauseIcon} width={32} height={32} alt='' className='text-4xl' />
                        </div>
                }
            </div>
        </div>
    )

}
