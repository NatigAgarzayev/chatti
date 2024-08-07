export interface Habit {
    id: number
    title: string
    created_at: string
    author_id: string
    count: number,
    type: string,
    records: NivoDataset[]
}

export interface Store {
    createModal: boolean,
    habitLoading: boolean,
    createTaskModal: boolean,
    createTaskLoading: boolean,
    statisticModal: boolean,
    modalId: number,
    confirmDeleteHabitModal: boolean,
    confirmDeleteTaskModal: boolean,
    updateCreateModal: (createModal: boolean) => void,
    updateHabitLoading: (habitLoading: boolean) => void,
    updateTaskModal: (createTaskModal: boolean) => void,
    updateTaskLoading: (createTaskLoading: boolean) => void,
    updateStatisticModal: (statisticModal: boolean) => void,
    updateModalId: (modalId: number) => void,
    updateConfirmDeleteHabitModal: (confirmDeleteModal: boolean) => void
    updateConfirmDeleteTaskModal: (confirmDeleteModal: boolean) => void
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

export interface NivoDataset {
    day: string,
    value: number
}