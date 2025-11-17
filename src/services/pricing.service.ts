import { publicClient } from '../api/clients/public.client'
import type { SupportedLocale } from '../i18n'
import type { PricingResponse } from '../types/pricing.types'
import type { TypeId } from '../types/root.types'

class PricingService {
	private BASE_URL = '/pricing'

	async getPricings(language: SupportedLocale) {
		const response = await publicClient.get<PricingResponse[]>(this.BASE_URL, {
			params: { language },
		})
		return response
	}

	async getPricing(id: TypeId) {
		const response = await publicClient.get<PricingResponse>(
			`${this.BASE_URL}/${id}`,
		)
		return response
	}
}

export const pricingService = new PricingService()
