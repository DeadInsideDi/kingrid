'use client'

import { Check } from 'lucide-react'
import { type FC } from 'react'
import { useLocalization } from '../../../../i18n'
import s from './PricingCard.module.scss'

export type PricingCardProps = {
	title: string
	annualPrice: string
	monthlyPrice: string
	isAnnually: boolean
	isPrimary: boolean
	keyFeatures: string[]
}

export const PricingCard: FC<PricingCardProps> = ({
	title,
	annualPrice,
	monthlyPrice,
	isAnnually,
	isPrimary,
	keyFeatures,
}) => {
	const { t } = useLocalization()

	return (
		<div
			className={`${s['pricing-card']} ${isPrimary ? s['primary-card'] : ''}`}
		>
			<h3>{title}</h3>
			<span className={s.price}>{isAnnually ? annualPrice : monthlyPrice}</span>
			<span>{t(`pricing.card.per-${isAnnually ? 'year' : 'month'}`)}</span>
			<ul>
				{keyFeatures.map((keyFeature, index) => (
					<li key={index}>
						<Check />
						{keyFeature}
					</li>
				))}
			</ul>
		</div>
	)
}
