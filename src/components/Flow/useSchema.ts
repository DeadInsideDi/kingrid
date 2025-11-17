import { useFlowStore } from '@/store/flow.store'

import type { FamilyMemberResponse } from '@/types/family-member.types'
import type {
	MemberWithPos,
	SchemaProps,
	TreeFamilyItem,
} from '@/types/flow.types'
import type { TypeId } from '@/types/root.types'
import { findAllAndRemove, findAndRemove } from '@/utils/array.utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { useFlowInit } from '../../utils/flow.utils'

export class FamilyTreeBuilder {
	constructor(private allMembers: FamilyMemberResponse[]) {}

	public buildTree() {
		const treeFamilyData: TreeFamilyItem[] = []
		if (!this.allMembers.length) return []

		const rootMember =
			findAndRemove(this.allMembers, m => !m.fatherId && !m.motherId) ||
			this.allMembers.splice(0, 1)[0]

		this.processSpouseGroup(rootMember, treeFamilyData)

		const membersRows: FamilyMemberResponse[][][] = []

		let currentGeneration
		for (const { members, generation } of treeFamilyData.toSorted(
			(a, b) => a.generation - b.generation,
		)) {
			if (currentGeneration !== generation) {
				membersRows.push([])
				currentGeneration = generation
			}
			membersRows.at(-1)!.push(members)
		}

		return membersRows.concat(this.allMembers.map(m => [[m]]))
	}
	private findAndRemoveHusband(id: TypeId) {
		return findAndRemove(this.allMembers, m => m.wife?.id === id)
	}
	private findAndRemoveWife(id: TypeId) {
		return findAndRemove(this.allMembers, m => m.husband?.id === id)
	}
	private buildSpouseGroup(member: FamilyMemberResponse) {
		const spouses: FamilyMemberResponse[] = []

		const husband =
			member.gender === 'MALE' ? member : this.findAndRemoveHusband(member.id)

		const wife =
			member.gender === 'FEMALE' ? member : this.findAndRemoveWife(member.id)

		if (wife) this.addFormerSpouses(wife, spouses)
		if (husband) spouses.push(husband)
		if (wife) spouses.push(wife)
		if (husband) this.addFormerSpouses(husband, spouses)

		let spousesLength = 0
		while (spousesLength !== spouses.length) {
			spousesLength = spouses.length
			spouses.forEach(spouse => this.addFormerSpouses(spouse, spouses))
		}
		for (let i = 0; i < spousesLength; i++) {
			const spouse = spouses[i]
			if (spouse.gender === 'MALE') {
				const wife = this.findAndRemoveWife(spouse.id)
				if (wife) spouses.splice(i + 1, 0, wife)
			} else {
				const husband = this.findAndRemoveHusband(spouse.id)
				if (husband) spouses.splice(i, 0, husband)
			}
		}

		return spouses
	}

	private addFormerSpouses(
		member: FamilyMemberResponse,
		spouses: FamilyMemberResponse[],
	) {
		const formerSpouseIds =
			member.gender === 'MALE'
				? member.husbandFormers?.map(({ formerWifeId }) => formerWifeId)
				: member.wifeFormers?.map(({ formerHusbandId }) => formerHusbandId)

		formerSpouseIds?.forEach(id => {
			const formerSpouse = findAndRemove(this.allMembers, m => m.id === id)
			if (formerSpouse) spouses.push(formerSpouse)
		})
	}

	private processSpouseGroup(
		member: FamilyMemberResponse,
		treeData: TreeFamilyItem[],
		generation = 0,
	) {
		const spouses = this.buildSpouseGroup(member)
		treeData.push({ members: spouses, generation })

		const { children, parents } = this.findRelatedMembers(spouses)
		const funcArgs: Parameters<typeof this.processSpouseGroup>[] = []

		children.forEach(m => funcArgs.push([m, treeData, generation + 1]))
		parents.forEach(m => funcArgs.push([m, treeData, generation - 1]))

		funcArgs.forEach(args => this.processSpouseGroup(...args))
	}

	private findRelatedMembers(spouses: FamilyMemberResponse[]) {
		const children: FamilyMemberResponse[] = []
		const parents: FamilyMemberResponse[] = []

		spouses.forEach(({ id, gender, fatherId, motherId }) => {
			const childPredicate =
				gender === 'MALE'
					? (m: FamilyMemberResponse) => m.fatherId === id
					: (m: FamilyMemberResponse) => m.motherId === id

			children.push(...findAllAndRemove(this.allMembers, childPredicate))

			const father = findAndRemove(this.allMembers, m => m.id === fatherId)
			const mother = findAndRemove(this.allMembers, m => m.id === motherId)

			if (father) parents.push(father)
			else {
				if (mother) parents.push(mother)
				return
			}

			const wifeIds = father.husbandFormers.concat(
				father.wife?.id ? [{ formerWifeId: father.wife?.id }] : [],
			)
			if (!wifeIds.some(m => m.formerWifeId === motherId) && mother)
				parents.push(mother)

			if (!parents.some(m => m.id === motherId) && mother)
				this.allMembers.push(mother)
		})
		return { children, parents }
	}
}

const calcMembersWidth = (
	membersRow: FamilyMemberResponse[][],
	memberWidth: number,
	horizontalGap: number,
	spouseGap: number,
) =>
	membersRow.length * horizontalGap +
	membersRow.reduce((sum, { length }) => sum + length, 0) *
		(memberWidth + spouseGap) -
	spouseGap

export const getMembersWithInitPos = (members: FamilyMemberResponse[]) => {
	const {
		memberWidth,
		memberHeight,
		horizontalGap,
		verticalGap,
		spouseGap,
		setMemberGeneration,
	} = useFlowStore.getState()
	const builder = new FamilyTreeBuilder(members.concat())
	const membersRows = builder.buildTree()

	const maxWidth = Math.max(
		...membersRows.map(row =>
			calcMembersWidth(row, memberWidth, horizontalGap, spouseGap),
		),
	)

	const membersWithPos: MemberWithPos[] = []

	membersRows.forEach((row, i) => {
		let x = ~~(
			(maxWidth -
				calcMembersWidth(row, memberWidth, horizontalGap, spouseGap)) /
			2
		)
		const y = i * (memberHeight + verticalGap)
		row.forEach(spouseGroup => {
			spouseGroup.forEach(member => {
				setMemberGeneration(member.id, i)
				membersWithPos.push({ ...member, y, x })
				x += memberWidth + spouseGap
			})
			x += horizontalGap
		})
	})

	return membersWithPos
}

export const useSchema = ({ members }: SchemaProps) => {
	const queryClient = useQueryClient()

	members.forEach(member => {
		queryClient.setQueryData(['member', member.id], member)
	})

	const membersWithPos = getMembersWithInitPos(members)

	const ref = useRef<SVGSVGElement>(null)
	const schema = { members: membersWithPos, ref }

	useFlowInit()
	return schema
}
