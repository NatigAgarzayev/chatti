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
    createTaskModal: boolean,
    createTaskLoading: boolean,
    updateCreateModal: (createModal: boolean) => void,
    updateHabitLoading: (habitLoading: boolean) => void,
    updateTaskModal: (createTaskModal: boolean) => void,
    updateTaskLoading: (createTaskLoading: boolean) => void,
}

export interface User {
    user: any,
    setUser: (user: any) => void
}

export default interface Kanban {
    id: number
    content: string
    created_at: string
    author_id: string
    progress: number
}