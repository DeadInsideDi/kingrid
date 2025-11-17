import { familyMemberService } from '@/services/family-member.service'
import type {
	FamilyMemberResponse,
	FamilyMemberUpdatePayload,
} from '@/types/family-member.types'

import type { TypeId } from '@/types/root.types'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

export interface UpdateFamilyMemberVariables {
	memberId: TypeId
	data: FamilyMemberUpdatePayload
}

interface MemberDebounceState {
	timeout: NodeJS.Timeout | null
	pendingChanges: FamilyMemberUpdatePayload
}

export const useDebouncedMutateCallback = <
	T extends (variables: UpdateFamilyMemberVariables) => unknown,
>(
	callback: T,
	delay: number,
) => {
	const debounceStatesRef = useRef<Map<TypeId, MemberDebounceState>>(new Map())

	const debouncedFunction = useCallback(
		async ({ memberId, data }: UpdateFamilyMemberVariables) => {
			let memberState = debounceStatesRef.current.get(memberId)
			if (!memberState) {
				memberState = {
					timeout: null,
					pendingChanges: {},
				}
				debounceStatesRef.current.set(memberId, memberState)
			}

			if (memberState.timeout) clearTimeout(memberState.timeout)

			memberState.pendingChanges = { ...memberState.pendingChanges, ...data }

			memberState.timeout = setTimeout(() => {
				const currentState = debounceStatesRef.current.get(memberId)
				if (currentState && Object.keys(currentState.pendingChanges).length) {
					callback({ memberId, data: currentState.pendingChanges })
					currentState.pendingChanges = {}
				}
			}, delay)
		},
		[callback, delay],
	)

	return debouncedFunction
}

export const useUpdateFamilyMember = () => {
	const debouncedUpdate = useDebouncedMutateCallback(
		({ memberId, data }: UpdateFamilyMemberVariables) =>
			familyMemberService.updateMember(memberId, data),
		1000,
	)

	return useMutation({
		mutationFn: ({ memberId, data }: UpdateFamilyMemberVariables) =>
			debouncedUpdate({ memberId, data }),
		onMutate: async (
			{ memberId, data }: UpdateFamilyMemberVariables,
			context,
		) => {
			await context.client.cancelQueries({ queryKey: ['member', memberId] })

			const member = context.client.getQueryData<FamilyMemberResponse>([
				'member',
				memberId,
			])

			context.client.setQueryData(['member', memberId], {
				...member,
				...data,
			})
		},

		onError: (error, { memberId }, onMutateResult, context) =>
			context.client.invalidateQueries({ queryKey: ['member', memberId] }),
	})
}
