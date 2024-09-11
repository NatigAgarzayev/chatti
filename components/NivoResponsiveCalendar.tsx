'use client'
import { NivoDataset } from '@/types'
import { ResponsiveCalendar } from '@nivo/calendar'
import React, { useEffect, useState } from 'react'

export default function NivoResponsiveCalendar({ data }: { data: NivoDataset[] }) {

    const [theme, setTheme] = useState("light")

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setTheme("dark")
          } else {
            document.documentElement.classList.remove('dark');
            setTheme("light")
          }
    }, [theme])


    return (
        <ResponsiveCalendar
            data={data}
            from={`${new Date().getFullYear()}-01-01`}
            to={`${new Date().getFullYear()}-12-31`}
            emptyColor={theme === "light" ? "#eeeeee" : "#111827"}
            colors={[theme === "light" ? 'rgb(99 102 241)' : "rgb(209 213 219)"]}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            minValue={0}
            maxValue='auto'
            yearSpacing={40}
            monthBorderColor={theme === "light" ? "#ffffff" : "rgb(75 85 99)"}
            dayBorderWidth={2}
            dayBorderColor={theme === "light" ? "#ffffff" : "rgb(75 85 99)"}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    )
}
