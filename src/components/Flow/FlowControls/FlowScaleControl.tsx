'use client'

import { RippleButton } from '@/components/ui/RippleButton/RippleButton'
import { useLocalization } from '@/i18n'
import { useFlowStore } from '@/store/flow.store'
import { Minus, Plus } from 'lucide-react'
import { type FC } from 'react'
import {
	MAX_SCALE,
	MIN_SCALE,
	scaleAbsolute,
	zoomStep,
} from '../../../utils/flow.utils'
import s from './FlowControls.module.scss'

export const FlowScaleControl: FC = () => {
	const scalePercents = useFlowStore(state => state.scalePercents)
	const minusDisabled = scalePercents / 100 <= MIN_SCALE
	const plusDisabled = scalePercents / 100 >= MAX_SCALE

	const { t } = useLocalization()

	return (
		<div
			className={s['flow-scale-control']}
			role='group'
			aria-label='Zoom controls'
		>
			<RippleButton
				aria-label={t('flow.controls.scale.zoom-out.aria-label')}
				title={t('flow.controls.scale.zoom-out.title')}
				disabled={minusDisabled}
				onClick={() => zoomStep('out')}
			>
				<Minus />
			</RippleButton>
			<input
				type='text'
				name='scale'
				aria-label={t('flow.controls.scale.input.aria-label')}
				title={t('flow.controls.scale.input.title')}
				value={scalePercents + '%'}
				maxLength={4}
				pattern='\d*%'
				onChange={e => {
					const scale = +e.currentTarget.value.replace(/\D/g, '')
					scaleAbsolute(scale / 100)
				}}
				onKeyDown={e => {
					const { value, selectionEnd } = e.currentTarget
					if (e.key === 'Backspace' && selectionEnd === value.length)
						e.currentTarget.value = value.slice(0, -1)
				}}
			/>
			<RippleButton
				aria-label={t('flow.controls.scale.zoom-in.aria-label')}
				title={t('flow.controls.scale.zoom-in.title')}
				disabled={plusDisabled}
				onClick={() => zoomStep('in')}
			>
				<Plus />
			</RippleButton>
		</div>
	)
}
