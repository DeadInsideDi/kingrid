import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_tokenRefreshed?: boolean
}

export type CustomAxiosError = AxiosError<{ message: string }>
