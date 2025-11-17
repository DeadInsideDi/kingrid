import type { TypeId } from './root.types'

export type PricingResponse = {
	id: TypeId
	title: string
	monthlyPrice: string
	annualPrice: string
	keyFeatures: string[]
}
