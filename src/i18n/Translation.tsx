import { Translation as I18nTranslation } from 'i18nano'
import type { ComponentProps, FC } from 'react'
import type { TranslationKey } from './types/translation.types'

export type TranslationProps = ComponentProps<typeof I18nTranslation> & {
	path: TranslationKey
}

export const Translation: FC<TranslationProps> = props => (
	<I18nTranslation {...props} />
)
