import { useLanguageStore } from '@/store/language.store'
import { publicClient } from '../api/clients/public.client'
import type {
	AuthActivatedResponse,
	AuthActivationPayload,
	AuthNotActivatedResponse,
	AuthPayload,
	AuthResponse,
} from '../types/auth.types'
import { removeTokenStorage, saveTokenStorage } from './auth-token.service'

class AuthService {
	private BASE_URL = '/auth'

	async register(data: AuthPayload) {
		const lang = useLanguageStore.getState().currentLanguage

		const response = await publicClient.post<AuthResponse>(
			`${this.BASE_URL}/register`,
			data,
			{ params: { lang } },
		)

		if (response.data.id !== null) saveTokenStorage(response.data.accessToken)
		return response
	}

	async resendCode(token: string) {
		const response = await publicClient.post<AuthNotActivatedResponse>(
			`${this.BASE_URL}/resend-code`,
			undefined,
			{ params: { token } },
		)

		return response
	}

	async activeAccount(data: AuthActivationPayload) {
		const response = await publicClient.post<AuthActivatedResponse>(
			`${this.BASE_URL}/active-account`,
			data,
		)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	}

	async login(data: AuthPayload) {
		const response = await publicClient.post<AuthActivatedResponse>(
			`${this.BASE_URL}/login`,
			data,
		)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	}

	async getNewTokens() {
		const response = await publicClient.post<AuthActivatedResponse>(
			`${this.BASE_URL}/login/refresh-token`,
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async logout() {
		const response = await publicClient.post<void>(`${this.BASE_URL}/logout`)

		if (response.status === 204) removeTokenStorage()

		return response
	}

	async unregister(data: AuthPayload) {
		const response = await publicClient.post<void>(
			`${this.BASE_URL}/unregister`,
			data,
		)
		return response
	}
}

export const authService = new AuthService()
