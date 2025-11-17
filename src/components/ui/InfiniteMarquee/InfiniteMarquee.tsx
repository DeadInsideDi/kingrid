'use client'

import { type FC } from 'react'
import s from './InfiniteMarquee.module.scss'
import {
	InfiniteMarqueeItem,
	type InfiniteMarqueeItemType,
} from './InfiniteMarqueeItem/InfiniteMarqueeItem'

export type InfiniteMarqueeProps = {
	items: InfiniteMarqueeItemType[]
}

export const InfiniteMarquee: FC<InfiniteMarqueeProps> = ({ items }) => {
	const itemsCount = items.length
	const duplicated3Items = items.concat(items).concat(items)

	return (
		<div className={s['infinite-marquee']}>
			<div className={s.group}>
				{duplicated3Items.map((item, index) => (
					<InfiniteMarqueeItem
						key={index}
						ariaHidden={index > itemsCount}
						{...item}
					/>
				))}
			</div>
		</div>
	)
}
