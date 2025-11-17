'use client'

import { useLocalization } from '@/i18n'
import { type Dispatch, type FC, type SetStateAction } from 'react'
import { Switch } from '../../../../components/ui/Switch/Switch'
import s from './PricingToggle.module.scss'

export type PricingToggleProps = {
	setIsAnnually: Dispatch<SetStateAction<boolean>>
	checked: boolean
}

export const PricingToggle: FC<PricingToggleProps> = ({
	checked,
	setIsAnnually,
}) => {
	const { t } = useLocalization()

	return (
		<div className={s['pricing-toggle']}>
			{t('pricing.toggle.monthly')}
			<Switch
				id='pricing-toggle'
				checked={checked}
				onChange={checked => setIsAnnually(checked)}
				name='is annually'
				title='Switch payment frequency'
				aria-label={t(
					checked
						? 'pricing.toggle.yearly-billing'
						: 'pricing.toggle.monthly-billing',
				)}
			/>
			{t('pricing.toggle.annually')}
			<div className={s.discount}>{t('pricing.toggle.discount')}</div>
		</div>
	)
}
