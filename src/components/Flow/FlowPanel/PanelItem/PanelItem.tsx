'use client'

import { type FC, type ReactNode } from 'react'
import s from './PanelItem.module.scss'

export type PanelItemProps = {
	title: string
	children: ReactNode
}

export const PanelItem: FC<PanelItemProps> = ({ title, children }) => {
	return (
		<div className={s['panel-item']}>
			<span>{title}</span>
			{children}
		</div>
	)
}
