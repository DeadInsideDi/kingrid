import { COOKEI } from '@/config/storage.config'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get(COOKEI.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(COOKEI.ACCESS_TOKEN, accessToken)
}

export const removeTokenStorage = () => {
	Cookies.remove(COOKEI.ACCESS_TOKEN)
}
