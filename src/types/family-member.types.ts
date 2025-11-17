import type { IBase, TypeId } from './root.types'

export type FamilyMemberGender = 'MALE' | 'FEMALE'

export type WifeFormer = {
	formerHusbandId: TypeId
}
export type HusbandFormer = {
	formerWifeId: TypeId
}

export interface FamilyMemberNames {
	firstName: string
	middleName: string
	lastName: string
}

export interface FamilyMemberTranslationNames {
	firstNameTransliteration: string
	middleNameTransliteration: string
	lastNameTransliteration: string
}

export interface FamilyMemberResponse
	extends IBase,
		FamilyMemberNames,
		FamilyMemberTranslationNames {
	gender: FamilyMemberGender
	birthDate: string
	birthPlace: string | null
	deathDate: string | null
	description: string
	avatarImageUrl: string | null
	imageUrls: string[]
	motherId: TypeId | null
	fatherId: TypeId | null
	familyId: TypeId
	husband: { id: TypeId } | null
	wife: { id: TypeId } | null
	husbandFormers: HusbandFormer[]
	wifeFormers: WifeFormer[]
}

export interface FamilyMemberCreatePayload extends Partial<FamilyMemberNames> {
	firstName: string
	gender: FamilyMemberGender
	birthDate?: Date
	birthPlace?: string | null
	deathDate?: Date | null
	description?: string
	avatarImageUrl?: string
	imageUrls?: string[]
	motherId?: string | null
	fatherId?: string | null
	wifeId?: string | null
	formerWifeIds?: string[]
	personalUserId?: string | null
}

export type FamilyMemberUpdatePayload = Partial<FamilyMemberCreatePayload>

export interface FamilyMemberAddImagesResponse {
	successfulImageUrls: string[]
	failedImagesCount: number
}
