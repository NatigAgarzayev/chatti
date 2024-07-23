'use client'
import { Store, User } from '@/types'
import { create } from 'zustand'


export const useStore = create<Store>((set) => ({
    createModal: false,
    habitLoading: false,
    createTaskModal: false,
    createTaskLoading: false,
    statisticModal: false,
    modalId: 0,
    confirmDeleteModal: false,
    updateCreateModal: (createModal) => set({ createModal }),
    updateHabitLoading: (habitLoading) => set({ habitLoading }),
    updateTaskModal: (createTaskModal) => set({ createTaskModal }),
    updateTaskLoading: (createTaskLoading) => set({ createTaskLoading }),
    updateStatisticModal: (statisticModal) => set({ statisticModal }),
    updateModalId: (modalId) => set({ modalId }),
    updateConfirmDeleteModal: (confirmDeleteModal) => set({ confirmDeleteModal }),

}))

export const useUser = create<User>((set) => ({
    user: {},
    setUser: (user: Object) => set({ user })
}))