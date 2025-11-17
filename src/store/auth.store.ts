import type { AuthAction } from '@/app/auth/page'
import { getAccessToken } from '@/services/auth-token.service'
import type { AuthPayload } from '@/types/auth.types'
import { create } from 'zustand'

export type VerificationInfo = {
	type: 'email' | 'phone'
	contact: string
}

export interface AuthStore {
	isAuthenticated: boolean
	setIsAuthenticated: (isAuthenticated: boolean) => void

	authAction: AuthAction
	setAuthAction: (authAction: AuthAction) => void

	authId: string
	setAuthId: (authId: string) => void
	authIdInvalid: boolean
	setIsAuthIdInvalid: (authIdInvalid: boolean) => void

	password: string
	setPassword: (password: string) => void
	passwordInvalid: boolean
	setIsPasswordInvalid: (passwordInvalid: boolean) => void

	activationToken: string
	setActivationToken: (activationToken: string) => void

	verificationCode: string
	setVerificationCode: (activationCode: string) => void
	verificationCodeInvalid: boolean
	setIsVerificationCodeInvalid: (activationCodeInvalid: boolean) => void

	verificationInfo: VerificationInfo
	setVerificationInfo: (data: AuthPayload) => void

	resetAuthIvalids: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	isAuthenticated: getAccessToken() !== null,
	setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),

	authAction: 'login',
	setAuthAction: authAction => set({ authAction }),

	authId: '',
	setAuthId: authId => set({ authId }),
	authIdInvalid: false,
	setIsAuthIdInvalid: authIdInvalid => set({ authIdInvalid }),

	password: '',
	setPassword: password => set({ password }),
	passwordInvalid: false,
	setIsPasswordInvalid: passwordInvalid => set({ passwordInvalid }),

	activationToken: '',
	setActivationToken: activationToken => set({ activationToken }),

	verificationCode: '',
	setVerificationCode: verificationCode => set({ verificationCode }),
	verificationCodeInvalid: false,
	setIsVerificationCodeInvalid: verificationCodeInvalid =>
		set({ verificationCodeInvalid }),

	verificationInfo: { type: 'email', contact: '' },
	setVerificationInfo: data => {
		const verificationInfo: VerificationInfo = { type: 'email', contact: '' }
		if (data.email) {
			verificationInfo.type = 'email'
			verificationInfo.contact = data.email
		} else if (data.phone) {
			verificationInfo.type = 'phone'
			verificationInfo.contact = data.phone
		}
		set({ verificationInfo })
	},

	resetAuthIvalids: () => {
		const { setIsAuthIdInvalid, setIsPasswordInvalid } = get()
		setIsAuthIdInvalid(false)
		setIsPasswordInvalid(false)
	},
}))
