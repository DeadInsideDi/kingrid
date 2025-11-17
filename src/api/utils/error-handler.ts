import { toast } from 'sonner'
import type { CustomAxiosError } from '../axios.types'

export const parseError = (error: CustomAxiosError): string => {
	const message = error.response?.data?.message || error.message
	return Array.isArray(message) ? message[0] : message
}

export const isTokenExpiredError = (error: CustomAxiosError): boolean => {
	const message = parseError(error).toLowerCase()
	return ['jwt expired', 'token', 'unauthorized'].some(term =>
		message.includes(term),
	)
}

export const isNoFamilyError = (message: string) =>
	message.toLowerCase().includes('you have no family')

export const isBadRequestError = (message: string) =>
	message.toLowerCase().includes('bad request')

export const isNotFoundError = (message: string) =>
	message.toLowerCase().includes('not found')

export const isPasswordError = (message: string) =>
	message.toLowerCase().includes('password')

export const isTokenError = (message: string) =>
	message.toLowerCase().includes('token')

export const isUnauthorizedError = (message: string) =>
	message.toLowerCase().includes('unauthorized')

export const isRateLimitError = (message: string) =>
	message.toLowerCase().includes('too many requests')

// FORM ERROR HANDLERS

export const ERROR_DURATION = 2500
export type ErrorHandlerCallback = (errorDurationTime: number) => void

export const handleAuthIdError = (
	message: string,
	callback?: ErrorHandlerCallback,
) => {
	message = message.toLowerCase()
	if (['email', 'phone', 'user'].some(term => message.includes(term))) {
		callback?.(ERROR_DURATION)
		toast.error(message)

		return true
	}
	return false
}

export const handlePasswordError = (
	message: string,
	callback?: ErrorHandlerCallback,
) => {
	if (isPasswordError(message)) {
		callback?.(ERROR_DURATION)
		toast.error(message)
		return true
	}
	return false
}

export const handleRateLimitError = (
	message: string,
	callback?: ErrorHandlerCallback,
) => {
	if (isRateLimitError(message)) {
		callback?.(ERROR_DURATION)
		toast.error(message)
		return true
	}
	return false
}

export const handleDefaultError = (
	message: string,
	callback?: ErrorHandlerCallback,
) => {
	callback?.(ERROR_DURATION)
	toast.error(message)
	return true
}

// VERIFICATION CODE

export const handleInvalidCode = (
	message: string,
	callback?: ErrorHandlerCallback,
) => {
	if (message.toLowerCase().includes('invalid code')) {
		callback?.(ERROR_DURATION)
		toast.error(message)
		return true
	}
	return false
}

export const handleExpiredCode = (
	message: string,
	callback?: ErrorHandlerCallback,
) => {
	if (message.toLowerCase().includes('expired code')) {
		callback?.(ERROR_DURATION)
		toast.error(message)
		return true
	}
	return false
}
