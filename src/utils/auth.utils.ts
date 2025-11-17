import type { AuthForm, AuthPayload } from '@/types/auth.types'

export const isEmail = (email: string) => {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(
		email,
	)
}

export const isPhone = (phone: string) => {
	return /^\+?[0-9-. ()]{4,}$/.test(phone)
}

export const parseToAuthPayload = (data: AuthForm): AuthPayload => {
	const authId = data.authId.trim()

	const newData: AuthPayload = {
		password: data.password,
		email: authId,
	}

	if (isPhone(authId)) {
		newData.phone = authId
		newData.email = undefined
	} else if (!isEmail(authId)) {
		newData.username = authId
		newData.email = undefined
	}
	return newData
}
