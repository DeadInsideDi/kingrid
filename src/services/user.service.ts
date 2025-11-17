import { authClient } from '../api/clients/auth.client'
import type { UserResponse, UserUpdatePayload } from '../types/auth.types'

class UserService {
	private BASE_URL = '/user'

	async getUser() {
		const response = await authClient.get<UserResponse>(this.BASE_URL)
		return response
	}

	async updateUser(data: UserUpdatePayload) {
		const response = await authClient.put<void>(this.BASE_URL, data)
		return response
	}

	async deleteUser() {
		const response = await authClient.delete<void>(this.BASE_URL)
		return response
	}
}
export const userService = new UserService()
