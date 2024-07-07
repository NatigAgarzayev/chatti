export interface Habit {
    id: number
    title: string
    created_at: string
    author_id: string
    count: number,
    type: string
}

export interface Store {
    createModal: boolean,
    habitLoading: boolean,
    updateCreateModal: (createModal: boolean) => void,
    updateHabitLoading: (habitLoading: boolean) => void,
}

export interface User {
    user: any,
    setUser: (user: any) => void
}