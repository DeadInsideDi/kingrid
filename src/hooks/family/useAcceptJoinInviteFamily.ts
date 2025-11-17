import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { familyInvitationService } from '@/services/family-invitation.service'
import { useAuthStore } from '@/store/auth.store'
import type { TypeId } from '@/types/root.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export type AcceptFamilyInvitationPayload = {
	id: TypeId
	connectFamily: boolean
}
export const useAcceptJoinInviteFamily = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, connectFamily }: AcceptFamilyInvitationPayload) =>
			familyInvitationService.acceptFamilyInvitation(id, connectFamily),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['family'] })
			useAuthStore.getState().setIsAuthenticated(true)
			router.push(DASHBOARD_PAGES.TREE)
		},
	})
}
