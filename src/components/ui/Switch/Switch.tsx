'use client'

import { useLocalization } from '@/i18n'
import { type FC } from 'react'
import s from './Switch.module.scss'

export type SwitchProps = {
	id: string
	onChange: (isChecked: boolean) => void
	checked: boolean
	disabled?: boolean
	name?: string
	['aria-label']?: string
	title?: string
}

export const Switch: FC<SwitchProps> = ({
	id,
	checked,
	onChange,
	...props
}) => {
	const { t } = useLocalization()

	return (
		<div className={s.switch}>
			<input
				id={id}
				type='checkbox'
				checked={checked}
				onChange={e => onChange(e.target.checked)}
			/>
			<label
				htmlFor={id}
				aria-label={props['aria-label'] || t('switch.aria-label')}
				{...props}
			></label>
		</div>
	)
}
