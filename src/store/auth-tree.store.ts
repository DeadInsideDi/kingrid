import { create } from 'zustand'

export type AuthTreeModalState = 'join' | 'create'

export interface AuthTreeStore {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void

	modalState: AuthTreeModalState
	setModalState: (modalState: AuthTreeModalState) => void

	treeName: string
	setTreeName: (treeName: string) => void

	treePassword: string
	setTreePassword: (treePassword: string) => void

	treeInviteId: string | null
	setTreeInviteId: (treeInviteId: string | null) => void
}

export const useAuthTreeStore = create<AuthTreeStore>(set => ({
	isOpen: false,
	setIsOpen: isOpen => set({ isOpen }),

	modalState: 'join',
	setModalState: modalState => set({ modalState }),

	treeName: '',
	setTreeName: treeName => set({ treeName }),

	treePassword: '',
	setTreePassword: treePassword => set({ treePassword }),

	treeInviteId: null,
	setTreeInviteId: treeInviteId => set({ treeInviteId }),
}))
