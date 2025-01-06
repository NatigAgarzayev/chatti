'use client'
import { Store, Habit } from '@/types'
import { create } from 'zustand'


export const useStore = create<Store>((set) => ({
    createModal: false,
    habitLoading: false,
    createTaskModal: false,
    createTaskLoading: false,
    statisticModal: false,
    modalId: 0,
    confirmDeleteHabitModal: false,
    confirmDeleteTaskModal: false,
    editTask: false,
    editTaskId: 0,
    editHabit: false,
    editHabitId: 0,
    editNotToday: false,
    createTeamModal: false,
    joinTeamModal: false,
    updateCreateModal: (createModal) => set({ createModal }),
    updateHabitLoading: (habitLoading) => set({ habitLoading }),
    updateTaskModal: (createTaskModal) => set({ createTaskModal }),
    updateTaskLoading: (createTaskLoading) => set({ createTaskLoading }),
    updateStatisticModal: (statisticModal) => set({ statisticModal }),
    updateModalId: (modalId) => set({ modalId }),
    updateConfirmDeleteHabitModal: (confirmDeleteHabitModal) => set({ confirmDeleteHabitModal }),
    updateConfirmDeleteTaskModal: (confirmDeleteTaskModal) => set({ confirmDeleteTaskModal }),
    updateEditTask: (editTask) => set({ editTask }),
    updateEditTaskId: (editTaskId) => set({ editTaskId }),
    updateEditHabit: (editHabit) => set({ editHabit }),
    updateEditHabitId: (editHabitId) => set({ editHabitId }),
    updateNotToday: (editNotToday) => set({ editNotToday }),
    updateCreateTeamModal: (createTeamModal) => set({ createTeamModal }),
    updateJoinTeamModal: (joinTeamModal) => set({ joinTeamModal }),
}))

export const useHabit = create<{ habits: Habit[], updateHabits: (habits: Habit[]) => void }>((set) => ({
    habits: [],
    updateHabits: (habits: Habit[]) => set({ habits }),
}))