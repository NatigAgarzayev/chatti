import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default function page() {

    const resetPassword = async (formData: FormData) => {
        'use server'
        const supabase = createClient()
        const { newPassword, confirmNewPassword } = Object.fromEntries(formData)
        if (newPassword.toString().trim() === "") {
            alert("Please enter your new password")
            return
        }
        if (confirmNewPassword.toString().trim() === "") {
            alert("Please confirm your new password")
            return
        }
        if (newPassword.toString() !== confirmNewPassword.toString()) {
            alert("Passwords do not match")
            return
        }
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword.toString()
        })
        redirect("/")
    }

    return (
        <form action={resetPassword} className='relative flex flex-col w-[400px] h-screen justify-center mx-auto'>
            <h2 className='font-bold text-xl mb-2 text-center'>Reset your password</h2>
            <input
                type='password'
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="new_password"
                placeholder="newPassword"
                required
            />
            <input
                type='password'
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                required
            />
            <button type="submit" className='p-2 bg-indigo-400 text-gray-700 font-bold rounded-lg disabled:bg-indigo-200'>Confirm</button>
        </form>
    )
}
