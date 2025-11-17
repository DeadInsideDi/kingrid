'use client'

import { useLocalization } from '@/i18n'
import { generateLinkToTokenJoin } from '@/services/family-invitation.service'
import { useFlowStore } from '@/store/flow.store'
import { type FC } from 'react'
import { toast } from 'sonner'
import s from './InvitePopup.module.scss'

export const InvitePopup: FC = () => {
	const invitePopupId = useFlowStore(state => state.invitePopupId)
	const invitePopupIsOpen = useFlowStore(state => state.invitePopupIsOpen)
	const { setInvitePopupId, setInvitePopupIsOpen } = useFlowStore.getState()
	const { t } = useLocalization()

	if (!invitePopupIsOpen || !invitePopupId) return null

	const linkToTokenJoin = generateLinkToTokenJoin(invitePopupId)
	const closePopup = () => {
		setInvitePopupIsOpen(false)
		setInvitePopupId(null)
	}

	return (
		<div
			className={s.overlay}
			onClick={closePopup}
		>
			<div
				className={s.content}
				onClick={e => e.stopPropagation()}
			>
				<h3>{t('flow.invite-popup.title')}</h3>
				<p>{t('flow.invite-popup.message')}</p>
				<span>{linkToTokenJoin}</span>
				<button
					className={s['copy-button']}
					onClick={() => {
						navigator.clipboard.writeText(linkToTokenJoin)
						toast.success(t('toast.success.copied-to-clipboard'))
					}}
				>
					{t('flow.invite-popup.copy-button')}
				</button>
				<button
					className={s['close-button']}
					onClick={closePopup}
				>
					{t('general.close')}
				</button>
			</div>
		</div>
	)
}
