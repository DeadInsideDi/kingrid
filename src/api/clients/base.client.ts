import axios, { type CreateAxiosDefaults } from 'axios'

export const createBaseClient = (config?: CreateAxiosDefaults) => {
	return axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
		...config,
	})
}
