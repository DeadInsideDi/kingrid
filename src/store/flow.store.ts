import type { FamilyMemberGender } from '@/types/family-member.types'
import type { SchemaType } from '@/types/flow.types'
import type { TypeId } from '@/types/root.types'
import { create } from 'zustand'

export type PanelTabType = 'info' | 'description' | 'images'
export type RelationAddingMenuType =
	| 'none'
	| 'add-father'
	| 'add-mother'
	| 'add-husband'
	| 'add-wife'
	| 'add-ex-husband'
	| 'add-ex-wife'
	| 'add-son'
	| 'add-daughter'

export interface FlowStore {
	schema: SchemaType | null
	setSchema: (schema: SchemaType | null) => void

	memberWidth: number
	memberHeight: number
	strokeWidth: number
	setMemberWidth: (width: number) => void
	setMemberHeight: (height: number) => void
	setStrokeWidth: (width: number) => void

	horizontalGap: number
	verticalGap: number
	spouseGap: number
	setHorizontalGap: (gap: number) => void
	setVerticalGap: (gap: number) => void
	setSpouseGap: (gap: number) => void

	memberGenerations: Record<TypeId, number>
	setMemberGeneration: (memberId: TypeId, generation: number) => void

	selectedMemberId: TypeId | null
	setSelectedMemberId: (memberId: TypeId) => void

	panelWidth: number
	setPanelWidth: (width: number) => void
	panelIsOpen: boolean
	setPanelIsOpen: (isOpen: boolean) => void

	scalePercents: number
	setScalePercents: (scalePercents: number) => void

	activeTab: PanelTabType
	setActiveTab: (tab: PanelTabType) => void

	relationAddingMenu: RelationAddingMenuType
	setRelationAddingMenu: (relationAddingMenu: RelationAddingMenuType) => void

	defaultMaleAvatarImageUrl: string
	defaultFemaleAvatarImageUrl: string
	setDefaultAvatarImageUrl: (url: string, gender: FamilyMemberGender) => void
	getDefaultAvatarImageUrl: (gender: FamilyMemberGender) => string

	invitePopupId: TypeId | null
	setInvitePopupId: (id: TypeId | null) => void

	invitePopupIsOpen: boolean
	setInvitePopupIsOpen: (isOpen: boolean) => void

	invitePopupIsLoading: boolean
	setInvitePopupIsLoading: (isLoading: boolean) => void
}

export const useFlowStore = create<FlowStore>((set, get) => ({
	schema: null,
	setSchema: schema => set({ schema }),

	memberWidth: 300,
	memberHeight: 150,
	strokeWidth: 8,
	setMemberWidth: memberWidth => set({ memberWidth }),
	setMemberHeight: memberHeight => set({ memberHeight }),
	setStrokeWidth: strokeWidth => set({ strokeWidth }),

	horizontalGap: 200,
	verticalGap: 100,
	spouseGap: 50,
	setHorizontalGap: gap => set({ horizontalGap: gap }),
	setVerticalGap: gap => set({ verticalGap: gap }),
	setSpouseGap: gap => set({ spouseGap: gap }),

	memberGenerations: {},
	setMemberGeneration: (memberId, generation) =>
		set(state => ({
			memberGenerations: {
				...state.memberGenerations,
				[memberId]: generation,
			},
		})),

	selectedMemberId: null,
	setSelectedMemberId: selectedMemberId => set({ selectedMemberId }),

	panelWidth: 400,
	setPanelWidth: panelWidth => set({ panelWidth }),
	panelIsOpen: true,
	setPanelIsOpen: panelIsOpen => set({ panelIsOpen }),

	scalePercents: 100,
	setScalePercents: scalePercents => set({ scalePercents }),

	activeTab: 'info',
	setActiveTab: activeTab => set({ activeTab }),

	relationAddingMenu: 'none',
	setRelationAddingMenu: relationAddingMenu => set({ relationAddingMenu }),

	defaultMaleAvatarImageUrl: 'https://i.postimg.cc/rySBkkz6/man.png',
	defaultFemaleAvatarImageUrl: 'https://i.postimg.cc/y6FMHHWH/woman.png',
	setDefaultAvatarImageUrl: (url, gender) =>
		gender === 'MALE'
			? set({ defaultMaleAvatarImageUrl: url })
			: set({ defaultFemaleAvatarImageUrl: url }),

	getDefaultAvatarImageUrl: gender =>
		gender === 'MALE'
			? get().defaultMaleAvatarImageUrl
			: get().defaultFemaleAvatarImageUrl,

	invitePopupId: null,
	setInvitePopupId: id => set({ invitePopupId: id }),

	invitePopupIsOpen: false,
	setInvitePopupIsOpen: isOpen => set({ invitePopupIsOpen: isOpen }),

	invitePopupIsLoading: false,
	setInvitePopupIsLoading: isLoading =>
		set({ invitePopupIsLoading: isLoading }),
}))
