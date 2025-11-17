'use client'

import {
	SITE_EMAIL,
	SITE_GITHUB,
	SITE_INSTAGRAM,
	SITE_PHONE,
	SITE_TWITTER,
} from '@/constants/seo.constants'
import { useLocalization } from '@/i18n'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useState, type FC } from 'react'
import { Github, Instagram, X } from '../../../public'
import { Navbar } from '../Navbar/Navbar'
import s from './Footer.module.scss'

export const Footer: FC = () => {
	const [email, setEmail] = useState('')
	const { t } = useLocalization()
	return (
		<footer className={s.footer}>
			<h2 className={s['social-title']}>{t('footer.social-title')}</h2>
			<p className={s['social-subtitle']}>{t('footer.social-subtitle')}</p>
			<div className={s['social-links']}>
				<Link
					href={SITE_GITHUB}
					aria-label={t('footer.social-links.github.aria-label')}
					title={t('footer.social-links.github.title')}
					target='_blank'
					rel='noopener noreferrer'
				>
					<Github />
				</Link>
				<Link
					href={SITE_INSTAGRAM}
					aria-label={t('footer.social-links.instagram.aria-label')}
					title={t('footer.social-links.instagram.title')}
					target='_blank'
					rel='noopener noreferrer'
				>
					<Instagram />
				</Link>
				<Link
					href={SITE_TWITTER}
					aria-label={t('footer.social-links.twitter.aria-label')}
					title={t('footer.social-links.twitter.title')}
					target='_blank'
					rel='noopener noreferrer'
				>
					<X />
				</Link>
			</div>
			<div className={s['social-contacts']}>
				<div>
					<b>{t('footer.social-contacts.phone')}</b>
					<Link
						href={`tel:${SITE_PHONE}`}
						aria-label={t('footer.social-contacts.phone-title')}
						target='_blank'
					>
						{SITE_PHONE}
					</Link>
				</div>
				<div>
					<b>{t('footer.social-contacts.email')}</b>
					<Link
						href={`mailto:${SITE_EMAIL}`}
						aria-label={t('footer.social-contacts.email-title')}
						target='_blank'
					>
						{SITE_EMAIL}
					</Link>
				</div>
			</div>

			<h2 className={s['newsletter-title']}>{t('footer.newsletter-title')}</h2>
			<p className={s['newsletter-subtitle']}>
				{t('footer.newsletter-subtitle')}
			</p>
			<form
				action=''
				className={s['newsletter-form']}
			>
				<input
					type='email'
					name='email'
					placeholder='you@domain.com'
					value={email}
					onChange={e => setEmail(e.target.value)}
					aria-label={t('footer.newsletter-form.aria-label')}
					required
					autoComplete='email'
				/>
				<button
					disabled={!email}
					title={t('footer.newsletter-form.button-title')}
				>
					<ArrowUpRight />
				</button>
			</form>

			<div className={s['footer-navbar']}>
				<Navbar />
			</div>

			<ul className={s['footer-rights']}>
				<li>
					{t('rights.copyright', { year: String(new Date().getFullYear()) })}
				</li>
				<li>
					<Link
						href='/privacy-policy'
						rel='noopener noreferrer'
						target='_blank'
					>
						{t('rights.privacy-policy')}
					</Link>
				</li>
				<li>
					<Link
						href='/terms-of-service'
						rel='noopener noreferrer'
						target='_blank'
					>
						{t('rights.terms-of-service')}
					</Link>
				</li>
				<li>
					<Link
						href='/cookie-policy'
						rel='noopener noreferrer'
						target='_blank'
					>
						{t('rights.cookie-policy')}
					</Link>
				</li>
			</ul>
		</footer>
	)
}
