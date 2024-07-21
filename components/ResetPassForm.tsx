'use client'
import { resetUserPass } from '@/api/authClient'
import React, { useState } from 'react'

export default function ResetPassForm() {
    const [loading, setLoading] = useState(false)

    const resetPassHandler = async (formData: FormData) => {
        const { email } = Object.fromEntries(formData)
        if (email.toString().trim() === "") {
            alert("Please enter your email")
            return
        }
        setLoading(true)
        const res = await resetUserPass(email + '')
        setLoading(false)
    }

    return (
        <form action={resetPassHandler} className='relative flex flex-col w-[400px] h-screen justify-center mx-auto'>
            <h2 className='font-bold text-xl mb-2 text-center'>Send link to the email</h2>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
            />
            <button disabled={loading} type="submit" className='p-2 bg-indigo-400 text-gray-700 font-bold rounded-lg disabled:bg-indigo-200'>{loading ? "Sending..." : "Send"}</button>
        </form>
    )
}
