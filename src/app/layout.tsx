import { Suspense } from 'react'

import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import type { FC } from 'react'

import './globals.css'

import { Footer, Header } from '@/widgets'
import { cn } from '@/shared'
import { StoreProvider } from '@/entities'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Crypto Portfel ITDextra corp.',
	description:
		'Приложение для добавления актуальных криптотокенов с топовых площадок себе в портфель для real-time мониторинга, аналитики и удобного отображения',
}

interface RootLayoutProps {
	children: React.ReactNode
}

const RootLayout: FC<Readonly<RootLayoutProps>> = props => {
	const { children } = props

	return (
		<html lang='ru' className='dark'>
			<body
				className={cn(
					'overflow-x-hidden text-base antialiased',
					'isolate flex flex-col',
					inter.className,
				)}
			>
				{/* Верхняя навигация */}
				<Header />

				<Suspense fallback={<p>Loading...</p>}>
					<StoreProvider>{children}</StoreProvider>
				</Suspense>

				{/* Подвал */}
				<Footer />
			</body>
		</html>
	)
}

export default RootLayout
