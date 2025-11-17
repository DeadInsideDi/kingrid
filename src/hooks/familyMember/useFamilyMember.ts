import { familyMemberService } from '@/services/family-member.service'
import type { TypeId } from '@/types/root.types'
import { useQuery } from '@tanstack/react-query'

export const useFamilyMember = (memberId: TypeId | null) => {
	return useQuery({
		queryKey: ['member', memberId],
		queryFn: () =>
			!memberId
				? null
				: familyMemberService.getMember(memberId).then(res => res.data),
		staleTime: Infinity,
	})
}
