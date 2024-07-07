'use client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'

export default function HabitStopwatch({ timer }: { timer: string }) {
    const [now, setNow] = useState(moment())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-10 flex items-center justify-center text-xl'>
            <Moment duration={timer} date={now} format="HH : mm : ss" />
        </div>
    )
}
