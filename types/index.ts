export interface Habit {
    id: number
    title: string
    created_at: string
    author_id: string
    count: number
    type: string
    records: NivoDataset[]
    streak: number
}

export interface Store {
    createModal: boolean
    habitLoading: boolean
    createTaskModal: boolean
    createTaskLoading: boolean
    statisticModal: boolean
    modalId: number
    confirmDeleteHabitModal: boolean
    confirmDeleteTaskModal: boolean
    editTask: boolean
    editTaskId: number
    editHabit: boolean
    editHabitId: number
    editNotToday: boolean
    updateCreateModal: (createModal: boolean) => void
    updateHabitLoading: (habitLoading: boolean) => void
    updateTaskModal: (createTaskModal: boolean) => void
    updateTaskLoading: (createTaskLoading: boolean) => void
    updateStatisticModal: (statisticModal: boolean) => void
    updateModalId: (modalId: number) => void
    updateConfirmDeleteHabitModal: (confirmDeleteModal: boolean) => void
    updateConfirmDeleteTaskModal: (confirmDeleteModal: boolean) => void
    updateEditTask: (editTask: boolean) => void
    updateEditTaskId: (editTaskId: number) => void
    updateEditHabit: (editHabit: boolean) => void
    updateEditHabitId: (editHabitId: number) => void
    updateNotToday: (editNotToday: boolean) => void
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