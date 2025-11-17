import { userService } from '@/services/user.service'
import type { UserUpdatePayload } from '@/types/auth.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (payload: UserUpdatePayload) => {
			return userService.updateUser(payload)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})
}
