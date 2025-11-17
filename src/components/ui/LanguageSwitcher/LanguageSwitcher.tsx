'use client'
import {
	SUPPORTED_LOCALES,
	SUPPORTED_LOCALES_NAMES,
} from '@/config/translation.config'
import { useOutside } from '@/hooks/useOutside'
import { useLocalization, type SupportedLocale } from '@/i18n'
import { Check, Globe } from 'lucide-react'
import { type FC } from 'react'
import s from './LanguageSwitcher.module.scss'

type LanguageOptionData = {
	id: SupportedLocale
	name: string
}

const languageList: LanguageOptionData[] = SUPPORTED_LOCALES.map(locale => ({
	id: locale,
	name: SUPPORTED_LOCALES_NAMES[locale],
}))

export const LanguageSwitcher: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { t, lang, change, preload } = useLocalization()

	return (
		<nav
			className={s['language-switcher']}
			ref={ref}
		>
			<button
				onClick={() => setIsShow(isShow => !isShow)}
				aria-expanded={isShow}
				title={t('language-switcher.title', { isOpen: isShow ? '1' : '0' })}
				aria-controls='language-switcher-subnav'
				aria-haspopup
			>
				<Globe />
			</button>

			<ol
				id='language-switcher-subnav'
				hidden={!isShow}
			>
				{languageList.map(language => (
					<li key={language.id}>
						<button
							tabIndex={isShow ? 0 : -1}
							onClick={() => change(language.id)}
							onMouseEnter={() => preload(language.id)}
						>
							{language.name} {lang === language.id && <Check />}
						</button>
					</li>
				))}
			</ol>
		</nav>
	)
}
