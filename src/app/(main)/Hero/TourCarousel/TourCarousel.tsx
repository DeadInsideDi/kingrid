'use client'

import { useLocalization } from '@/i18n'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState, type FC } from 'react'
import s from './TourCarousel.module.scss'

const items = [
	'getting-started',
	'adding-members',
	'adding-users',
	'customization',
	'export-tree',
] as const
const itemsCount = items.length

export const TourCarousel: FC = () => {
	const [currentCarouselItemIndex, setCurrentCarouselItemIndex] = useState(0)
	const carouselRef = useRef<HTMLOListElement>(null)
	const { t } = useLocalization()

	const shiftCarouselBy = (shiftPositions: number) => {
		if (!carouselRef.current) return

		const newIndex =
			(currentCarouselItemIndex + shiftPositions + itemsCount) % itemsCount

		setCurrentCarouselItemIndex(newIndex)

		const items = carouselRef.current.querySelectorAll('li')
		const item = items?.item(newIndex)

		carouselRef.current.scroll({
			behavior: 'smooth',
			left: item.offsetLeft,
		})
	}

	return (
		<div
			className={s['carousel-wrapper']}
			id='how-it-works'
		>
			<ol
				ref={carouselRef}
				className={s.tour}
				aria-label='How it works'
				aria-live='assertive'
				tabIndex={-1}
			>
				{items.map(item => (
					<li
						key={item}
						className={s[item]}
						style={{ backgroundImage: `url(/${item}.png)` }}
						aria-current={currentCarouselItemIndex === items.indexOf(item)}
					>
						{t(`home.tour.${item}`)}
					</li>
				))}
			</ol>
			<fieldset
				aria-controls='How it works'
				aria-label='carousel buttons'
			>
				<button
					aria-label='Previous slide'
					onClick={() => shiftCarouselBy(-1)}
				>
					<ArrowLeft />
				</button>
				<button
					aria-label='Next slide'
					onClick={() => shiftCarouselBy(1)}
				>
					<ArrowRight />
				</button>
			</fieldset>
		</div>
	)
}
