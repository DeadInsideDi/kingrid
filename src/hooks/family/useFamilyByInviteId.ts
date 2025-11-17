import { familyService } from '@/services/family.service'
import { useQuery } from '@tanstack/react-query'

export const useFamilyByInviteId = (inviteId: string | null) => {
	return useQuery({
		queryKey: ['familyPublic', inviteId],
		queryFn: async () => {
			if (!inviteId) return null
			return await familyService
				.getAnotherFamilyByInviteId(inviteId)
				.then(res => res.data)
		},
	})
}
