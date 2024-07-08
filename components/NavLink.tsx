'use client'
import Link from 'next/link'
import React from 'react'

export default function NavLink({ link, content, style }: { link: string, content: string, style?: string }) {

    return (
        <Link href={link} className={style} replace>
            {content}
        </Link>
    )
}
