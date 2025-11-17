import type { BaseUserResponse } from './auth.types'
import type { FamilyMemberResponse } from './family-member.types'
import type { IBase, TypeId } from './root.types'

export interface FamilyAuthPayload {
	name: string
	password: string
}

export type FamilyCreatePayload = FamilyAuthPayload

export interface FamilyResponse extends IBase {
	name: string
	ownerId: TypeId
	familyMembers: FamilyMemberResponse[]
	users: BaseUserResponse[]
	owner: BaseUserResponse
}

export type FamilyUpdatePayload = Partial<FamilyCreatePayload>

export interface FamilyPublicResponse {
	name: string
	owner: {
		username: string
		avatarImageUrl: string | null
	}
	_count: {
		familyMembers: number
		users: number
	}
}
