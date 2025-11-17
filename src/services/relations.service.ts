import type { TypeId } from '@/types/root.types'
import { authClient } from '../api/clients/auth.client'
import type { RelationsResponse } from '../types/relations.types'

class RelationsService {
	private BASE_URL = '/relations'

	async getRelations(fromId: TypeId, lang: string) {
		const response = await authClient.get<RelationsResponse>(this.BASE_URL, {
			params: { fromId, lang },
		})
		return response
	}

	async addParent(familyMemberId: TypeId, parentFamilyMemberId: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/add-parent`,
			undefined,
			{
				params: {
					id: familyMemberId,
					parentId: parentFamilyMemberId,
				},
			},
		)
		return response
	}

	async deleteParent(familyMemberId: TypeId, parentFamilyMemberId: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/delete-parent`,
			undefined,
			{
				params: {
					id: familyMemberId,
					parentId: parentFamilyMemberId,
				},
			},
		)
		return response
	}

	async addSpouse(familyMemberId: TypeId, spouseFamilyMemberId: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/add-spouse`,
			undefined,
			{
				params: {
					id: familyMemberId,
					spouseId: spouseFamilyMemberId,
				},
			},
		)
		return response
	}

	async deleteSpouse(familyMemberId: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/delete-spouse`,
			undefined,
			{
				params: { id: familyMemberId },
			},
		)
		return response
	}

	async makeSpouseAsFormer(familyMemberId: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/make-spouse-as-former`,
			undefined,
			{
				params: { id: familyMemberId },
			},
		)
		return response
	}

	async makeFormerSpouseAsCurrent(
		familyMemberId: TypeId,
		spouseFamilyMemberId: TypeId,
	) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/make-former-spouse-as-current`,
			undefined,
			{
				params: {
					id: familyMemberId,
					spouseId: spouseFamilyMemberId,
				},
			},
		)
		return response
	}

	async addFormerSpouse(
		familyMemberId: TypeId,
		formerSpouseFamilyMemberId: TypeId,
	) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/add-former-spouse`,
			undefined,
			{
				params: {
					id: familyMemberId,
					spouseId: formerSpouseFamilyMemberId,
				},
			},
		)
		return response
	}

	async deleteFormerSpouse(
		familyMemberId: TypeId,
		formerSpouseFamilyMemberId: TypeId,
	) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/delete-former-spouse`,
			undefined,
			{
				params: {
					id: familyMemberId,
					spouseId: formerSpouseFamilyMemberId,
				},
			},
		)
		return response
	}
}

export const relationsService = new RelationsService()
