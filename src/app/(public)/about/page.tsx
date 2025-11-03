import type { Metadata } from 'next'

import { cn } from '@/shared'

export const metadata: Metadata = {
	title: 'Страница о проекте Crypto ITDextra',
	description: 'Здесь представлена информация об используемых технологиях',
}
export default function About() {
	return (
		<div
			className={cn('h-screen', 'flex flex-col justify-center items-center')}
		>
			The Page is still under development
		</div>
	)
}
