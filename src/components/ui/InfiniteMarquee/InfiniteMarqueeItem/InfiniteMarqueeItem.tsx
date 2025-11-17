'use client'

import Image from 'next/image'
import { type FC } from 'react'
import s from './InfiniteMarqueeItem.module.scss'

export type InfiniteMarqueeItemType = {
	image: string
	name: string
}

export type InfiniteMarqueeItemProps = InfiniteMarqueeItemType & {
	ariaHidden: boolean
}

export const InfiniteMarqueeItem: FC<InfiniteMarqueeItemProps> = ({
	image,
	name,
	ariaHidden,
}) => {
	return (
		<div
			className={s['infinite-marquee-item']}
			aria-hidden={ariaHidden}
		>
			<Image
				src={image}
				alt={name}
				loading='lazy'
				width={64}
				height={64}
			/>
			<p>{name}</p>
		</div>
	)
}
