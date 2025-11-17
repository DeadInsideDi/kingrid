import { connectionManager } from '@/components/Flow/connectionManager'
import { familyMemberService } from '@/services/family-member.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFamilyMember = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => familyMemberService.deleteMember(id),
		onSuccess(data, id) {
			connectionManager.deleteConnectionsById(id)
			queryClient.setQueryData(['member', id], null)
			queryClient.invalidateQueries({
				queryKey: ['family'],
			})
		},
	})
}
