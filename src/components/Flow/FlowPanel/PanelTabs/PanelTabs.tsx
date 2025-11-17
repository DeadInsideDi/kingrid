'use client'

import { useLocalization } from '@/i18n'
import { useFlowStore, type PanelTabType } from '@/store/flow.store'
import { type FC } from 'react'
import s from './PanelTabs.module.scss'

const tabs: PanelTabType[] = ['info', 'description', 'images']

export const PanelTabs: FC = () => {
	const activeTab = useFlowStore(state => state.activeTab)
	const setActiveTab = useFlowStore(state => state.setActiveTab)
	const { t } = useLocalization()

	return (
		<div className={s['panel-tabs']}>
			{tabs.map(tab => (
				<label key={tab}>
					<input
						checked={activeTab === tab}
						onChange={() => setActiveTab(tab)}
						name='tree-tab-action'
						value={tab}
						type='radio'
					/>
					<span>{t(`flow.panel.tabs.${tab}`)}</span>
				</label>
			))}
			<span />
		</div>
	)
}
