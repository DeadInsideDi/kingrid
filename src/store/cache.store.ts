import type { UserResponse } from '@/types/auth.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CacheStore {
	user: UserResponse
	setUser: (user?: UserResponse) => void
}

export const defaultUser = {
	createdAt: '',
	updatedAt: '',
	id: '',
	email: null,
	phone: null,
	username: '',
	avatarImageUrl: null,
	familyMemberId: null,
	familyId: null,
}

export const useCacheStore = create<CacheStore>()(
	persist(
		set => ({
			user: defaultUser,
			setUser: (user?: UserResponse) =>
				set(() => ({ user: user || defaultUser })),
		}),
		{
			name: 'cache-storage',
		},
	),
)
