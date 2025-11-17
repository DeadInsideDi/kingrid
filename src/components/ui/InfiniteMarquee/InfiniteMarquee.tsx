'use client'

import { type FC } from 'react'
import s from './InfiniteMarquee.module.scss'
import {
	InfiniteMarqueeItem,
	type InfiniteMarqueeItemProps,
} from './InfiniteMarqueeItem/InfiniteMarqueeItem'

export type InfiniteMarqueeProps = {
	items: InfiniteMarqueeItemProps[]
}

export const InfiniteMarquee: FC<InfiniteMarqueeProps> = ({ items }) => {
	const children = items.map((item, index) => (
		<InfiniteMarqueeItem
			key={index}
			{...item}
		/>
	))

	return (
		<div className={s['infinite-marquee']}>
			<div className={s.group}>{children}</div>
			<div
				className={s.group}
				aria-hidden
			>
				{children}
			</div>
		</div>
	)
}
