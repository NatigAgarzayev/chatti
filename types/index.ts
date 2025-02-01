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
    createEventModal: boolean
    deleteEventId: string
    editEventModal: boolean
    editEventId: string
    deleteTeamId: string
    deleteTeamModal: boolean
    leaveTeamModal: boolean
    leaveTeamId: string
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
    updateCreateEventModal: (createEventModal: boolean) => void
    updateDeleteEventId: (deleteEventId: string) => void
    updateEditEventModal: (editEventModal: boolean) => void
    updateEditEventId: (editEventId: string) => void
    updateDeleteTeamId: (deleteTeamId: string) => void
    updateDeleteTeamModal: (deleteTeamModal: boolean) => void
    updateLeaveTeamModal: (leaveTeamModal: boolean) => void
    updateLeaveTeamId: (leaveTeamId: string) => void
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
export interface Participant {
    id: string | undefined
    name: string | undefined
}

export interface Record {
    id: string
    title: string
    description: string
    start: string
    end: string
    people?: string[] | undefined
}

export interface Team {
    team_id: string
    team_name: string
    created_at: string
    team_lead_id: string
    participants: Participant[]
    records: Record[]
}


export interface Event {
    calendarId?: string
    description: string
    end: string
    id: string
    location?: string
    people: string[]
    start: string
    title: string
    _options?: any
}
