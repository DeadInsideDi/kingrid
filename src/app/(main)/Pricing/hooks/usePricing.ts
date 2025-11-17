import { useQuery } from '@tanstack/react-query'
import { useLocalization } from '../../../../i18n'
import { pricingService } from '../../../../services/pricing.service'
import type { PricingResponse } from '../../../../types/pricing.types'

const loading = 'Loading...'
const placeholderData: PricingResponse[] = Array(3)
	.fill(null)
	.map((_, index) => ({
		id: index.toString(),
		title: loading,
		monthlyPrice: loading,
		annualPrice: loading,
		keyFeatures: [loading, loading, loading, loading],
	}))

export const usePricing = () => {
	const { lang } = useLocalization()

	return useQuery({
		queryKey: ['pricing', lang],
		queryFn: () => pricingService.getPricings(lang).then(res => res.data),
		placeholderData,
	})
}
