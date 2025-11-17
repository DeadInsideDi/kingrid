'use client'
import { DateInput } from '@/components/ui/DateInput/DateInput'
import { RippleButton } from '@/components/ui/RippleButton/RippleButton'
import { useFamilyMember } from '@/hooks/familyMember/useFamilyMember'
import { useUpdateFamilyMember } from '@/hooks/familyMember/useUpdateFamilyMember'
import { useLocalization } from '@/i18n'
import { familyMemberService } from '@/services/family-member.service'
import { useFlowStore } from '@/store/flow.store'
import type {
	FamilyMemberGender,
	FamilyMemberResponse,
} from '@/types/family-member.types'
import type { TypeId } from '@/types/root.types'
import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, Plus } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState, type FC } from 'react'
import { toast } from 'sonner'
import { PanelItem } from '../PanelItem/PanelItem'
import s from './PanelContent.module.scss'

export type GenderSwitcherProps = {
	memberId: TypeId
	gender: FamilyMemberGender
}

const GenderSwitcher: FC<GenderSwitcherProps> = ({ memberId, gender }) => {
	const { mutate } = useUpdateFamilyMember()
	const { t } = useLocalization()
	return (
		<div
			className={s['gender-switcher']}
			role='radiogroup'
			aria-label={t('flow.panel.fields.gender')}
		>
			<label>
				<input
					checked={gender === 'MALE'}
					onChange={() => {
						mutate({ memberId, data: { gender: 'MALE' } })
					}}
					name='gender'
					value='male'
					type='radio'
				/>
				<span>{t('flow.panel.fields.male')}</span>
			</label>
			<label>
				<input
					checked={gender === 'FEMALE'}
					onChange={() => {
						mutate({ memberId, data: { gender: 'FEMALE' } })
					}}
					name='gender'
					value='female'
					type='radio'
				/>
				<span>{t('flow.panel.fields.female')}</span>
			</label>
			<span aria-hidden />
		</div>
	)
}

export type PanelItemProps = {
	member?: FamilyMemberResponse | null
}

const PanelContentInfo: FC<PanelItemProps> = ({ member }) => {
	const { mutate } = useUpdateFamilyMember()
	const [firstName, setFirstName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [lastName, setLastName] = useState('')
	const [birthDate, setBirthDate] = useState<string | Date>('')
	const [birthPlace, setBirthPlace] = useState('')
	const [deathDate, setDeathDate] = useState<string | Date>('')
	const memberId = member?.id || ''

	const { t } = useLocalization()

	useEffect(() => {
		setFirstName(member?.firstName || '')
		setMiddleName(member?.middleName || '')
		setLastName(member?.lastName || '')
		setBirthDate(member?.birthDate || '')
		setBirthPlace(member?.birthPlace || '')
		setDeathDate(member?.deathDate || '')
	}, [member])

	return (
		<>
			<PanelItem title={t('flow.panel.fields.gender')}>
				<GenderSwitcher
					memberId={memberId}
					gender={member?.gender || 'MALE'}
				/>
			</PanelItem>

			<PanelItem title={t('flow.panel.fields.first-name')}>
				<input
					value={firstName.trim()}
					onChange={e => {
						const value = e.currentTarget.value.trim() || ' '
						setFirstName(value)
						mutate({
							memberId,
							data: { firstName: value },
						})
					}}
					name='first-name'
					placeholder={t('flow.panel.fields.first-name-placeholder')}
					type='text'
					aria-label={t('flow.panel.fields.first-name')}
					autoComplete='given-name'
				/>
			</PanelItem>

			<PanelItem title={t('flow.panel.fields.middle-name')}>
				<input
					value={middleName}
					onChange={e => {
						const value = e.currentTarget.value.trim()
						setMiddleName(value)
						mutate({
							memberId,
							data: { middleName: value },
						})
					}}
					name='middle-name'
					placeholder={t('flow.panel.fields.middle-name-placeholder')}
					type='text'
					aria-label={t('flow.panel.fields.middle-name')}
					autoComplete='additional-name'
				/>
			</PanelItem>

			<PanelItem title={t('flow.panel.fields.last-name')}>
				<input
					value={lastName}
					onChange={e => {
						const value = e.currentTarget.value.trim()
						setLastName(value)
						mutate({
							memberId,
							data: { lastName: value },
						})
					}}
					name='last-name'
					placeholder={t('flow.panel.fields.last-name-placeholder')}
					type='text'
					aria-label={t('flow.panel.fields.last-name')}
					autoComplete='family-name'
				/>
			</PanelItem>

			<PanelItem title={t('flow.panel.fields.birth-date')}>
				<DateInput
					value={birthDate}
					onChange={birthDate => {
						if (birthDate) {
							setBirthDate(birthDate)
							mutate({ memberId, data: { birthDate } })
						}
					}}
				/>
			</PanelItem>

			<PanelItem title={t('flow.panel.fields.birth-place')}>
				<input
					value={birthPlace || ''}
					onChange={e => {
						const { value } = e.currentTarget
						setBirthPlace(value)
						mutate({
							memberId,
							data: { birthPlace: value },
						})
					}}
					name='birth-place'
					placeholder={t('flow.panel.fields.birth-place-placeholder')}
					type='text'
					aria-label={t('flow.panel.fields.birth-place')}
				/>
			</PanelItem>

			<PanelItem title={t('flow.panel.fields.death-date')}>
				<DateInput
					value={deathDate || ''}
					onChange={deathDate => {
						setDeathDate(deathDate || '')
						mutate({ memberId, data: { deathDate } })
					}}
				/>
			</PanelItem>
		</>
	)
}

const PanelContentDescription: FC<PanelItemProps> = ({ member }) => {
	const { mutate } = useUpdateFamilyMember()
	const [valueDescription, setValueDescription] = useState(
		member?.description || '',
	)
	const memberId = member?.id || ''

	const { t } = useLocalization()

	useEffect(() => {
		setValueDescription(member?.description || '')
	}, [member?.description, setValueDescription])

	return (
		<>
			<PanelItem title={t('flow.panel.fields.description')}>
				<textarea
					value={valueDescription}
					onChange={e => {
						setValueDescription(e.currentTarget.value)
						mutate({
							memberId,
							data: { description: e.currentTarget.value },
						})
					}}
					name='description'
					placeholder={t('flow.panel.fields.description-placeholder')}
					aria-label={t('flow.panel.fields.description')}
				/>
			</PanelItem>
		</>
	)
}

const PanelContentImages: FC<PanelItemProps> = ({ member }) => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isUploading, setIsUploading] = useState(false)
	const { mutate } = useUpdateFamilyMember()
	const { t } = useLocalization()

	const client = useQueryClient()
	const memberId = member?.id || ''

	const handleButtonClick = () => fileInputRef.current?.click()

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { files } = event.target
		const acceptedFiles = []
		let notImageFilesCount = 0
		let overSizeFilesCount = 0

		if (!files?.length || !memberId) return []

		for (const file of files) {
			const notImageFile = !file.type.startsWith('image/')
			const overSizeFile = file.size > 5 * 1024 * 1024
			if (notImageFile) notImageFilesCount++
			if (overSizeFile) overSizeFilesCount++
			if (notImageFile || overSizeFile) continue
			acceptedFiles.push(file)
		}

		if (notImageFilesCount)
			toast.error(
				t('toast.error.not-image-files', { count: String(notImageFilesCount) }),
			)

		if (overSizeFilesCount)
			toast.error(
				t('toast.error.over-size-files', { count: String(overSizeFilesCount) }),
			)

		let response
		try {
			setIsUploading(true)
			response = await familyMemberService.addImagesToMember(
				memberId,
				acceptedFiles,
			)
		} catch {
			toast.error(t('toast.error.failed-to-upload-images', { count: '0' }))
			return []
		} finally {
			setIsUploading(false)
		}

		const { successfulImageUrls, failedImagesCount } = response.data

		if (failedImagesCount)
			toast.error(
				t('toast.error.failed-to-upload-images', {
					count: String(failedImagesCount),
				}),
			)

		client.setQueryData(['member', memberId], {
			...member,
			imageUrls: member?.imageUrls.concat(successfulImageUrls),
		})
		return successfulImageUrls
	}

	return (
		<div className={s['images-grid']}>
			{member?.imageUrls.map((url, i) => (
				<div
					key={i}
					className={s['image-container']}
					data-selected={member.avatarImageUrl === url}
					onClick={() =>
						mutate({
							memberId,
							data: { avatarImageUrl: url },
						})
					}
				>
					<Image
						src={url}
						alt=''
					/>
				</div>
			))}
			<input
				ref={fileInputRef}
				onChange={handleFileSelect}
				accept='image/*'
				type='file'
				hidden
			/>
			<RippleButton onClick={handleButtonClick}>
				{isUploading ? <LoaderCircle className={s.loader} /> : <Plus />}
			</RippleButton>
		</div>
	)
}

export const PanelContent: FC = () => {
	const activeTab = useFlowStore(state => state.activeTab)
	const selectedMemberId = useFlowStore(state => state.selectedMemberId)
	const { data: member } = useFamilyMember(selectedMemberId)

	return (
		<div className={s['panel-content']}>
			{activeTab === 'info' && <PanelContentInfo member={member} />}
			{activeTab === 'description' && (
				<PanelContentDescription member={member} />
			)}
			{activeTab === 'images' && <PanelContentImages member={member} />}
		</div>
	)
}
