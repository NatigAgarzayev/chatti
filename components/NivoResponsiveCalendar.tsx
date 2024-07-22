import { NivoDataset } from '@/types'
import { ResponsiveCalendar } from '@nivo/calendar'
import React from 'react'

export default function NivoResponsiveCalendar({ data }: { data: NivoDataset[] }) {

    return (
        <ResponsiveCalendar
            data={data}
            from={`${new Date().getFullYear()}-01-01`}
            to={`${new Date().getFullYear()}-12-31`}
            emptyColor="#eeeeee"
            colors={['rgb(99 102 241)']}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            minValue={0}
            maxValue='auto'
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
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
