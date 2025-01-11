'use client'

import React from 'react'
import Scheduler from './Scheduler'
import { Team } from '@/types'

export default function TeamDashboardContent({ team }: { team: Team }) {
    return (
        <div>
            <Scheduler team={team} />
        </div>
    )
}
