'use client'

import { useAuthStore } from '@/store/auth.store'
import { useRef, type FC } from 'react'
import s from './verificationStyles.module.scss'
import { useLocalization } from '@/i18n'

const DIGIT_FIELDS_COUNT = 4
const LAST_DIGIT_INDEX = DIGIT_FIELDS_COUNT - 1

export const AuthCodeField: FC = () => {
	const setVerificationCode = useAuthStore(state => state.setVerificationCode)
	const codeInputsRef = useRef<HTMLDivElement>(null)
	const { t } = useLocalization()
	const minMax = (i: number) => Math.max(0, Math.min(i, LAST_DIGIT_INDEX))

	const getInput = (i: number) =>
		codeInputsRef.current?.children[minMax(i)] as HTMLInputElement

	const focusInput = (i: number) => getInput(i).select()

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		i: number,
	) => {
		if (e.key.length == 1 && !e.altKey && !e.ctrlKey && !e.metaKey)
			e.preventDefault()

		if (e.code.startsWith('Digit')) {
			e.currentTarget.value = e.key
			changeCode(e)
			focusInput(i + 1)
		} else if (e.code === 'Backspace') {
			e.currentTarget.value = ''
			changeCode(e)
			focusInput(i - 1)
			e.preventDefault()
		} else if (e.code === 'ArrowLeft') {
			focusInput(i - 1)
			e.preventDefault()
		} else if (e.code === 'ArrowRight') {
			focusInput(i + 1)
			e.preventDefault()
		}
	}

	const handlePaste = (
		e: React.ClipboardEvent<HTMLInputElement>,
		i: number,
	) => {
		const test = e.clipboardData
			.getData('text')
			.replace(/\D/g, '')
			.slice(0, DIGIT_FIELDS_COUNT)

		const startIndex = test.length === DIGIT_FIELDS_COUNT ? 0 : i
		const lastIndex = Math.min(test.length, DIGIT_FIELDS_COUNT)

		for (let ind = 0; ind < lastIndex; ind++)
			getInput(startIndex + ind).value = test[ind]

		changeCode(e)
		focusInput(lastIndex)
		e.preventDefault()
	}

	const getCode = (): string =>
		Array.from({ length: DIGIT_FIELDS_COUNT }).reduce(
			(acc: string, _, i) => acc + getInput(i).value,
			'',
		)

	const changeCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
		const code = getCode()

		if (code.length === DIGIT_FIELDS_COUNT) {
			const form = e.currentTarget.form
			if (!form) return
			setVerificationCode(code)
			form.requestSubmit()
		}
	}

	return (
		<div
			className={s['auth-code-field']}
			role='group'
			title={t('auth.verification.code-field-title')}
			ref={codeInputsRef}
		>
			{Array.from({ length: DIGIT_FIELDS_COUNT }, (_, i) => (
				<input
					key={i}
					required
					type='text'
					name={`digit${i + 1}`}
					inputMode='numeric'
					pattern='\d*'
					maxLength={1}
					autoComplete='one-time-code'
					onKeyDown={e => handleKeyDown(e, i)}
					onPaste={e => handlePaste(e, i)}
					onFocus={e => e.target.select()}
				/>
			))}
		</div>
	)
}
