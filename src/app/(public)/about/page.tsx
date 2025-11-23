import { ListInfo } from '@/features/info-about-us'

import { BreadcrumbCard } from '@/shared/components'

import { PAGES } from '@/shared'

import type { Metadata } from 'next'
import type { FC } from 'react'

export const metadata: Metadata = {
	title: 'О проекте Crypto Portfel от ITDextra',
	description: 'Технологии, наработки, процессы и лучшие практики веб-разработки приложений',
}
const About: FC = () => {
	return (
		<>
			<BreadcrumbCard listBreadcrumb={[{ label: 'О нас', href: PAGES.ABOUT }]} />

			<ListInfo />
		</>
	)
}

export default About
