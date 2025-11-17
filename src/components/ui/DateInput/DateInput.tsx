'use client'

import { useLocalization } from '@/i18n'
import { useEffect, useState, type FC } from 'react'
import s from './DateInput.module.scss'

const dateToDayString = (date: Date) =>
	[
		date.getDate().toString().padStart(2, '0'),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getFullYear(),
	].join('/')

const dateToTimeString = (date: Date) =>
	[
		date.getHours().toString().padStart(2, '0'),
		date.getMinutes().toString().padStart(2, '0'),
		date.getSeconds().toString().padStart(2, '0'),
	].join(':')

const dateStringsToDate = (dayString: string, timeString: string) => {
	const [day, month, year] = dayString.split('/').map(Number)
	const [hours, minutes, seconds] = timeString.split(':').map(Number)
	const date = new Date(year, month - 1, day, hours, minutes, seconds)
	return date.toString() === 'Invalid Date' ? null : date
}

const formatValue = (value: string, sep: '/' | ':') => {
	const countOfSep = value.split(sep).length - 1
	if (value.length === 2 && countOfSep < 1) value += sep
	if (value.length === 5 && countOfSep < 2) value += sep
	return value
}

export type DateInputProps = {
	value?: Date | string
	onChange?: (date: Date | null) => void
}

export const DateInput: FC<DateInputProps> = ({ value, onChange }) => {
	const [dayValue, setDayValue] = useState('')
	const [timeValue, setTimeValue] = useState('')

	const { t } = useLocalization()

	useEffect(() => {
		if (!value) {
			setDayValue('')
			setTimeValue('')
			return
		}

		const date = new Date(value)
		setDayValue(dateToDayString(date))
		setTimeValue(dateToTimeString(date))
	}, [value])

	return (
		<div className={s['date-input']}>
			<input
				value={dayValue}
				onChange={e => {
					const { value } = e.currentTarget
					setDayValue(formatValue(value, '/'))
					if (value.length === 10 && onChange) {
						onChange(dateStringsToDate(value, timeValue || '12:00:00'))
					}
				}}
				maxLength={10}
				pattern='\d+/\d+/\d{4}'
				placeholder='31/12/2000'
				name='day-date'
				autoComplete='off'
				type='text'
				aria-label={t('flow.panel.date-input.day-aria-label')}
			/>
			<input
				value={timeValue}
				onChange={e => {
					const { value } = e.currentTarget
					setTimeValue(formatValue(value, ':'))
					if (value.length === 8 && dayValue.length === 10 && onChange) {
						onChange(dateStringsToDate(dayValue, value))
					}
				}}
				maxLength={8}
				pattern='\d+:\d+:\d+'
				placeholder='12:00:00'
				name='time-date'
				autoComplete='off'
				type='text'
				aria-label={t('flow.panel.date-input.time-aria-label')}
			/>
		</div>
	)
}
