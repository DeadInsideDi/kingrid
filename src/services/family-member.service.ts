import type { TypeId } from '@/types/root.types'
import { authClient } from '../api/clients/auth.client'
import type {
	FamilyMemberAddImagesResponse,
	FamilyMemberCreatePayload,
	FamilyMemberGender,
	FamilyMemberResponse,
	FamilyMemberUpdatePayload,
} from '../types/family-member.types'

export const defaultMember: FamilyMemberResponse = {
	avatarImageUrl: '',
	birthDate: '',
	birthPlace: '',
	deathDate: '',
	description: '',
	firstName: '',
	gender: 'MALE',
	lastName: '',
	middleName: '',
	motherId: '',
	fatherId: '',
	id: '',
	createdAt: '',
	updatedAt: '',
	familyId: '',
	husband: { id: '' },
	wife: { id: '' },
	firstNameTransliteration: '',
	middleNameTransliteration: '',
	lastNameTransliteration: '',
	husbandFormers: [],
	wifeFormers: [],
	imageUrls: [],
}

class FamilyMemberService {
	private BASE_URL = '/family-member'

	async searchMember(
		firstName?: string,
		middleName?: string,
		lastName?: string,
		birthDate?: Date,
		gender?: FamilyMemberGender,
		deathDate?: Date,
		// Pagination parameters
		page?: number,
		limit?: number,
	) {
		const response = await authClient.get<FamilyMemberResponse[]>(
			`${this.BASE_URL}/search`,
			{
				params: {
					fn: firstName,
					mn: middleName,
					ln: lastName,
					b: birthDate,
					g: gender,
					d: deathDate,
					p: page,
					l: limit,
				},
			},
		)
		return response
	}

	async createMember(data: FamilyMemberCreatePayload) {
		const response = await authClient.post<TypeId>(this.BASE_URL, data)
		return response
	}

	async getMember(familyMemberId: TypeId) {
		const response = await authClient.get<FamilyMemberResponse>(
			`${this.BASE_URL}/${familyMemberId}`,
		)
		return response
	}

	async setAvatarImageToMember(familyMemberId: TypeId, file: File) {
		const formData = new FormData()
		formData.append('file', file) // 'file' must match @FileInterceptor('file') in backend

		const response = await authClient.patch<string>(
			`${this.BASE_URL}/set-avatar-image/${familyMemberId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		return response
	}

	async addImagesToMember(memberId: TypeId, files: File[]) {
		const formData = new FormData()
		files.forEach(file => formData.append('files', file))

		const response = await authClient.patch<FamilyMemberAddImagesResponse>(
			`${this.BASE_URL}/add-images/${memberId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		return response
	}

	async updateMember(memberId: TypeId, data: FamilyMemberUpdatePayload) {
		const response = await authClient.put<void>(
			`${this.BASE_URL}/${memberId}`,
			data,
		)
		return response
	}

	async connectToUser(memberId: TypeId) {
		const response = await authClient.patch<void>(
			`${this.BASE_URL}/connect-to-user/${memberId}`,
		)
		return response
	}

	async deleteMember(memberId: TypeId) {
		const response = await authClient.delete<void>(
			`${this.BASE_URL}/${memberId}`,
		)
		return response
	}
}

export const familyMemberService = new FamilyMemberService()
