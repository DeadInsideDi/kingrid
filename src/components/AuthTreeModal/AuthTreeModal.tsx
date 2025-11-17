'use client'

import { useCreateFamily } from '@/hooks/family/useCreateFamily'
import { useFamily } from '@/hooks/family/useFamily'
import { useJoinFamily } from '@/hooks/family/useJoinFamily'
import { useShortcut } from '@/hooks/useShotcut'
import { useLocalization } from '@/i18n'
import { useAuthTreeStore } from '@/store/auth-tree.store'
import { Lock, TreeDeciduous, X } from 'lucide-react'
import { useEffect, type FC } from 'react'
import { RippleButton } from '../ui/RippleButton/RippleButton'
import s from './AuthTreeModal.module.scss'
import { InputField } from './InputField/InputField'

const InputNameField: FC = () => {
	const name = useAuthTreeStore(state => state.treeName)
	const setName = useAuthTreeStore(state => state.setTreeName)
	const { t } = useLocalization()

	return (
		<InputField
			onChange={e => {
				setName(e.currentTarget.value)
			}}
			value={name}
			name='tree-name'
			required
			placeholder={t('auth-tree-modal.name-field.placeholder')}
			autoFocus
			icon={<TreeDeciduous />}
		/>
	)
}

const InputPasswordField: FC = () => {
	const password = useAuthTreeStore(state => state.treePassword)
	const setTreePassword = useAuthTreeStore(state => state.setTreePassword)
	const { t } = useLocalization()

	return (
		<InputField
			onChange={e => {
				setTreePassword(e.currentTarget.value)
			}}
			value={password}
			name='password'
			required
			placeholder={t('auth-tree-modal.password-field.placeholder')}
			autoComplete='off'
			icon={<Lock />}
		/>
	)
}

export const AuthTreeModal: FC = () => {
	const { data: family } = useFamily()

	const { mutate: createTree } = useCreateFamily()
	const { mutate: joinTree } = useJoinFamily()

	const isOpen = useAuthTreeStore(state => state.isOpen)
	const { setIsOpen, setTreePassword, setTreeName } =
		useAuthTreeStore.getState()
	const modalState = useAuthTreeStore(state => state.modalState)
	const { t } = useLocalization()

	const isJoin = modalState === 'join'

	useEffect(() => {
		if (family && isOpen && !isJoin) setIsOpen(false)
	}, [family, isOpen, isJoin, setIsOpen])

	const close = () => {
		setTreePassword('')
		setTreeName('')
		setIsOpen(false)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const { treeName, treePassword } = useAuthTreeStore.getState()
		const data = { name: treeName, password: treePassword }

		if (isJoin) joinTree(data)
		else createTree(data)
		close()
	}

	useShortcut(['Escape'], close)

	return (
		<dialog
			className={s.modal}
			open={isOpen}
		>
			<RippleButton
				className={s.close}
				onClick={close}
			>
				<X />
			</RippleButton>

			<div className={s.header}>
				<h2>{t(`auth-tree-modal.${modalState}`)}</h2>
				<p>{t(`auth-tree-modal.${modalState}-recomendation`)}</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className={s.form}
			>
				<InputNameField />
				<InputPasswordField />

				<button
					type='submit'
					className={s.submit}
				>
					<span>{t(`general.${modalState}`)}</span>
				</button>
			</form>
		</dialog>
	)
}
