import { connectionManager } from '@/components/Flow/connectionManager'
import { defaultMember } from '@/services/family-member.service'
import type { RelationAddingMenuType } from '@/store/flow.store'
import type { FamilyResponse } from '@/types/family.types'
import type { ConnectionType } from '@/types/flow.types'
import type { TypeId } from '@/types/root.types'
import { useMutation } from '@tanstack/react-query'

export type AddMemberToFamilyVariables = {
	newMemberId: TypeId
	isNew: boolean
	fromMemberId: TypeId
	relationAddingMenu: RelationAddingMenuType
}
export const useAddMemberToFamily = () => {
	return useMutation({
		onMutate: (
			{
				newMemberId,
				fromMemberId,
				relationAddingMenu,
			}: AddMemberToFamilyVariables,
			context,
		) => {
			const family = context.client.getQueryData<FamilyResponse>(['family'])
			family?.familyMembers.push({ ...defaultMember, id: newMemberId })
			context.client.setQueryData<FamilyResponse>(['family'], family)

			const membersOrder: [TypeId, TypeId] = [newMemberId, fromMemberId]
			let connectionType: ConnectionType = 'lineage'

			if (
				relationAddingMenu === 'add-son' ||
				relationAddingMenu === 'add-daughter' ||
				relationAddingMenu.includes('husband')
			)
				membersOrder.reverse()

			if (relationAddingMenu.includes('ex')) connectionType = 'ex-spouse'
			else if (
				relationAddingMenu === 'add-wife' ||
				relationAddingMenu === 'add-husband'
			)
				connectionType = 'spouse'

			connectionManager.addConnection(...membersOrder, connectionType)
		},

		onError: (error, data, onMutateResult, context) =>
			context.client.invalidateQueries({ queryKey: ['family'] }),
	})
}
