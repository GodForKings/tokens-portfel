import type { Metadata } from 'next'
import type { FC } from 'react'

import { cn } from '@/shared'

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
			The Page is still under development
		</div>
	)
}

export default About
