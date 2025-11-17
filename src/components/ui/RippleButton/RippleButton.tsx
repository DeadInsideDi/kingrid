'use client'

import type { ComponentProps, FC, MouseEvent } from 'react'
import s from './RippleButton.module.scss'

const createRippleCircle = (e: MouseEvent) => {
	const newRound = document.createElement('span'),
		target = e.currentTarget as HTMLElement

	const { x, y } = target.getBoundingClientRect()

	newRound.className = s['ripple-button-circle']
	newRound.style.left = e.pageX - x + 'px'
	newRound.style.top = e.pageY - y + 'px'
	target.appendChild(newRound)

	setTimeout(() => newRound.remove(), 300)
}

export const RippleButton: FC<ComponentProps<'button'>> = ({
	onMouseDown,
	className,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			onMouseDown={e => {
				onMouseDown?.(e)
				createRippleCircle(e)
			}}
			className={[s['ripple-button'], className].join(' ')}
		>
			{children}
		</button>
	)
}
