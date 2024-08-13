'use client'
import { Store } from '@/types'
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
    updateCreateModal: (createModal) => set({ createModal }),
    updateHabitLoading: (habitLoading) => set({ habitLoading }),
    updateTaskModal: (createTaskModal) => set({ createTaskModal }),
    updateTaskLoading: (createTaskLoading) => set({ createTaskLoading }),
    updateStatisticModal: (statisticModal) => set({ statisticModal }),
    updateModalId: (modalId) => set({ modalId }),
    updateConfirmDeleteHabitModal: (confirmDeleteHabitModal) => set({ confirmDeleteHabitModal }),
    updateConfirmDeleteTaskModal: (confirmDeleteTaskModal) => set({ confirmDeleteTaskModal }),
}))