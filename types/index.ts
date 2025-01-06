export interface Habit {
    id: number
    title: string
    created_at: string
    author_id: string
    count: number
    type: string
    records: NivoDataset[]
    streak: number
    pinned?: boolean
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
    createTeamModal: boolean
    joinTeamModal: boolean
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
    updateCreateTeamModal: (createTeamModal: boolean) => void
    updateJoinTeamModal: (joinTeamModal: boolean) => void
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

interface Participant {
    user_id: string
    name: string
    email: string
}

interface Record {
    user_id: string
    task_id: number
    task_title: string
    task_created_at: string
    task_completed_at: string
    task_description: string
    task_progress: number
}

export interface Team {
    team_id: number
    team_name: string
    created_at: string
    team_lead_id: string
    participants: Participant[]
    records: Record[]
}
