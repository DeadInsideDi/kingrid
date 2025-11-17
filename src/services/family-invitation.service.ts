import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import type { TypeId } from '@/types/root.types'
import { authClient } from '../api/clients/auth.client'
import type {
	FamilyInvitationPayload,
	FamilyInvitationResponse,
} from '../types/family-invitation.types'

class FamilyInvitationService {
	private BASE_URL = '/family-invitation'

	async getSendedFamilyInvitations() {
		const response = await authClient.get<FamilyInvitationResponse>(
			`${this.BASE_URL}/sended`,
		)
		return response
	}

	async getReceivedFamilyInvitations() {
		const response = await authClient.get<FamilyInvitationResponse>(
			`${this.BASE_URL}/received`,
		)
		return response
	}

	async createFamilyInvitation(data: FamilyInvitationPayload) {
		const response = await authClient.post<TypeId>(this.BASE_URL, data)
		return response
	}

	async acceptFamilyInvitation(id: TypeId, connectFamily: boolean) {
		const response = await authClient.patch<TypeId>(
			`${this.BASE_URL}/accept/${id}`,
			{ connectFamily },
		)
		return response
	}

	async revokeFamilyInvitation(id: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/revoke/${id}`,
		)
		return response
	}
}

export const familyInvitationService = new FamilyInvitationService()

export const generateLinkToTokenJoin = (id: TypeId) => {
	const pageToTokenJoin = DASHBOARD_PAGES.tokenJoinWithId(id)
	const linkToTokenJoin = process.env.NEXT_PUBLIC_SITE_URL + pageToTokenJoin
	return linkToTokenJoin
}
