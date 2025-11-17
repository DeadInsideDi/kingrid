'use client'

import { type FC } from 'react'
import s from './InputField.module.scss'

export type InputFieldProps = React.HTMLProps<HTMLInputElement> & {
	icon?: React.ReactNode
}

export const InputField: FC<InputFieldProps> = ({ icon, ...props }) => {
	return (
		<div className={s['input-field']}>
			<input {...props} />
			{icon}
		</div>
	)
}
