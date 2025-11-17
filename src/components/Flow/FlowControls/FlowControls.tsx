'use client'

import { RippleButton } from '@/components/ui/RippleButton/RippleButton'
import { Download, Focus, MoveDiagonal } from 'lucide-react'
import { type FC } from 'react'

import { useFamily } from '@/hooks/family/useFamily'
import { useShortcut } from '@/hooks/useShotcut'
import { useLocalization } from '@/i18n'
import {
	exportTree,
	translateToCenter,
	zoomReset,
	zoomStep,
} from '../../../utils/flow.utils'
import s from './FlowControls.module.scss'
import { FlowScaleControl } from './FlowScaleControl'

export const FlowControls: FC = () => {
	const { data: family } = useFamily()

	useShortcut(['KeyE'], () => exportTree(family))
	useShortcut(['KeyR'], () => zoomReset())
	useShortcut(['KeyC'], () => translateToCenter())
	useShortcut(['Equal'], () => zoomStep('in'))
	useShortcut(['Minus'], () => zoomStep('out'))

	const { t } = useLocalization()

	return (
		<div className={s['flow-controls']}>
			<RippleButton
				onClick={() => exportTree(family)}
				aria-label={t('flow.controls.export.aria-label')}
				title={t('flow.controls.export.title')}
			>
				<Download />
			</RippleButton>

			<RippleButton
				onClick={() => translateToCenter()}
				aria-label={t('flow.controls.center.aria-label')}
				title={t('flow.controls.center.title')}
			>
				<Focus />
			</RippleButton>

			<FlowScaleControl />

			<RippleButton
				onClick={() => zoomReset()}
				aria-label={t('flow.controls.reset-zoom.aria-label')}
				title={t('flow.controls.reset-zoom.title')}
			>
				<MoveDiagonal />
			</RippleButton>
		</div>
	)
}
