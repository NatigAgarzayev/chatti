
import Link from 'next/link'
import React from 'react'

export default async function page() {

    return (
        <h2>
            Hello mate, <Link href={"/dashboard/main"}> Go main </Link>
        </h2>
    )
}
