import { familyMemberService } from '@/services/family-member.service'
import { relationsService } from '@/services/relations.service'
import type { RelationAddingMenuType } from '@/store/flow.store'
import type { FamilyMemberResponse } from '@/types/family-member.types'

export type AddRelationOptions = {
	fromMember: FamilyMemberResponse
	memberId?: string
	isNew?: boolean
	startedText: string
}

export const addFather = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'MALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addParent(fromMember.id, memberId)
	return memberId
}

export const addMother = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'FEMALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addParent(fromMember.id, memberId)
	return memberId
}

export const addHusband = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'MALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addSpouse(fromMember.id, memberId)
	return memberId
}

export const addWife = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'FEMALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addSpouse(fromMember.id, memberId)
	return memberId
}

export const addExHusband = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'MALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addFormerSpouse(memberId, fromMember.id)
	return memberId
}

export const addExWife = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'FEMALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addFormerSpouse(fromMember.id, memberId)
	return memberId
}

export const addSon = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'MALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addParent(memberId, fromMember.id)
	return memberId
}

export const addDaughter = async ({
	fromMember,
	memberId,
	isNew,
	startedText,
}: AddRelationOptions) => {
	if (isNew) {
		memberId = await familyMemberService
			.createMember({
				firstName: startedText + fromMember.firstName,
				lastName: fromMember.lastName,
				gender: 'FEMALE',
			})
			.then(res => res.data)
	}
	if (!memberId) return null
	await relationsService.addParent(memberId, fromMember.id)
	return memberId
}

export const addRelationByType: Record<
	RelationAddingMenuType,
	(options: AddRelationOptions) => Promise<string | null>
> = {
	none: async () => null,
	'add-father': addFather,
	'add-mother': addMother,
	'add-husband': addHusband,
	'add-wife': addWife,
	'add-ex-husband': addExHusband,
	'add-ex-wife': addExWife,
	'add-son': addSon,
	'add-daughter': addDaughter,
}
