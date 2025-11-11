import type { Metadata } from 'next'
import type { FC } from 'react'

import { cn } from '@/shared'
import { ListInfo } from '@/features/info-about-us'

export const metadata: Metadata = {
	title: 'О проекте Crypto Portfel от ITDextra',
	description:
		'Технологии, наработки, процессы и лучшие практики веб-разработки приложений',
}
const About: FC = () => {
	return (
		<div
			className={cn(
				'p-1 lg:p-4 min-h-screen',
				'flex flex-col justify-center items-center'
			)}
		>
			<ListInfo />
		</div>
	)
}

export default About
