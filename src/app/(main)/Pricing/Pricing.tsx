'use client'

import { useLocalization } from '@/i18n'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState, type FC } from 'react'
import s from './Pricing.module.scss'
import { PricingCard } from './PricingCard/PricingCard'
import { PricingToggle } from './PricingToggle/PricingToggle'
import { usePricing } from './hooks/usePricing'

export const Pricing: FC = () => {
	const { data: pricings } = usePricing()
	const [isAnnually, setIsAnnually] = useState(true)
	const { t } = useLocalization()

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.pricing',
				start: 'top 100%',
			},
		})
		tl.from('.pricing>h2, pricing>p', {
			y: '-4rem',
			scale: 0,
			duration: 0.5,
			ease: 'power2.out',
		})
			.from(`.${s['pricing-cards']}>div`, {
				y: '-4rem',
				rotate: 15,
				opacity: 0,
				scale: 0,
				duration: 0.25,
				ease: 'power2.out',
			})
			.from(`.${s['pricing-cards']}>div>ul`, {
				backgroundColor: 'transparent',
				duration: 0.25,
			})

		return () => {
			tl.kill()
		}
	})

	return (
		<section
			className='pricing'
			aria-labelledby='pricing'
		>
			<h2 id='pricing'>{t('pricing.title')}</h2>
			<p>{t('pricing.description')}</p>
			<PricingToggle
				checked={isAnnually}
				setIsAnnually={setIsAnnually}
			/>

			<div className={s['pricing-cards']}>
				{(pricings || []).map((card, index) => (
					<PricingCard
						key={card.id}
						{...card}
						isPrimary={index % 2 === 1}
						isAnnually={isAnnually}
					/>
				))}
			</div>
		</section>
	)
}
