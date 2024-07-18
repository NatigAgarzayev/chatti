import { createClient } from "@/utils/supabase/client"

export const getUserData = async () => {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    return user
}

export const userLogOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
}

export const resetUserPass = async (email: string) => {
    const supabase = createClient()

    let { data, error } = await supabase.auth.resetPasswordForEmail(email)

}