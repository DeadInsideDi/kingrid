import type { TypeId } from './root.types'

export type FamilyInvitationStatus =
	| 'PENDING'
	| 'ACCEPTED'
	| 'EXPIRED'
	| 'REVOKED'

export interface FamilyInvitationResponse {
	id: TypeId
	createdAt: string
	familyMemberId: TypeId
	familyId: TypeId
	expiresAt: string
	status: FamilyInvitationStatus
	inviterUserId: TypeId
	inviteeUserId: TypeId | null
}

export interface FamilyInvitationPayload {
	familyMemberId: TypeId
	inviteeUserId?: TypeId
	expiresAt?: Date
}
