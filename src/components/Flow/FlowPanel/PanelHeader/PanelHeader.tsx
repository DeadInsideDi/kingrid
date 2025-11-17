'use client'

import { LogoLink } from '@/components/Header/Header'
import { RippleButton } from '@/components/ui/RippleButton/RippleButton'
import { useLocalization } from '@/i18n'
import { X } from 'lucide-react'
import { type FC } from 'react'
import flowPanelStyles from '../FlowPanel.module.scss'
import s from './PanelHeader.module.scss'

export type PanelHeaderProps = {
	onClose: () => void
}

export const PanelHeader: FC<PanelHeaderProps> = ({ onClose }) => {
	const { t } = useLocalization()
	return (
		<div className={s['panel-header']}>
			<LogoLink />

			<RippleButton
				onClick={() => onClose()}
				className={flowPanelStyles.close}
				title={t('flow.panel.close-title')}
			>
				<X />
			</RippleButton>
		</div>
	)
}
