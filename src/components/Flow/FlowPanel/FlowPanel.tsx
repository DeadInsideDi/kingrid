'use client'

import { RippleButton } from '@/components/ui/RippleButton/RippleButton'
import { useLocalization } from '@/i18n'
import { useFlowStore } from '@/store/flow.store'
import { PanelLeft } from 'lucide-react'
import { type FC } from 'react'
import s from './FlowPanel.module.scss'
import { PanelContent } from './PanelContent/PanelContent'
import { PanelFooter } from './PanelFooter/PanelFooter'
import { PanelHeader } from './PanelHeader/PanelHeader'
import { PanelTabs } from './PanelTabs/PanelTabs'
import { RelationAddingMenu } from './RelationAddingMenu'

export const FlowPanel: FC = () => {
	const panelWidth = useFlowStore(state => state.panelWidth)
	const panelIsOpen = useFlowStore(state => state.panelIsOpen)
	const setPanelIsOpen = useFlowStore(state => state.setPanelIsOpen)
	const { t } = useLocalization()

	return (
		<>
			<RippleButton
				onClick={() => setPanelIsOpen(true)}
				className={s.open}
				aria-expanded={panelIsOpen}
				aria-hidden={panelIsOpen}
				disabled={panelIsOpen}
				title={t('flow.panel.open-title')}
			>
				<PanelLeft />
			</RippleButton>

			<dialog
				className={s['flow-panel']}
				style={{ width: panelWidth }}
				open={panelIsOpen}
				aria-modal
			>
				<PanelHeader onClose={() => setPanelIsOpen(false)} />
				<PanelTabs />
				<PanelContent />
				<PanelFooter />
			</dialog>
			<RelationAddingMenu />
		</>
	)
}
