import type { TypeId } from '@/types/root.types'
import { authClient } from '../api/clients/auth.client'
import type {
	FamilyAuthPayload,
	FamilyCreatePayload,
	FamilyPublicResponse,
	FamilyResponse,
	FamilyUpdatePayload,
} from '../types/family.types'

class FamilyService {
	private BASE_URL = '/family'

	async createFamily(data: FamilyCreatePayload) {
		const response = await authClient.post<TypeId>(this.BASE_URL, data)
		return response
	}

	async getFamily() {
		const response = await authClient.get<FamilyResponse>(this.BASE_URL)
		return response
	}

	async getAnotherFamilyByInviteId(inviteId: TypeId) {
		const response = await authClient.get<FamilyPublicResponse>(
			`${this.BASE_URL}/public`,
			{
				params: { inviteId },
			},
		)
		return response
	}

	async connectToFamily(data: FamilyAuthPayload) {
		const response = await authClient.patch<TypeId>(
			`${this.BASE_URL}/connect-user`,
			data,
		)
		return response
	}

	async updateFamily(id: TypeId, data: FamilyUpdatePayload) {
		const response = await authClient.put<void>(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteFamily(id: TypeId) {
		const response = await authClient.delete<void>(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const familyService = new FamilyService()
