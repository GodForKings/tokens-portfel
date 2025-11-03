import type { Metadata } from 'next'

import { Suspense, type FC } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

import { Footer, Header } from '@/widgets'
import { cn } from '@/shared'
import { StoreProvider } from '@/entities'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'crypto-itdextra',
	description:
		'Добавление токенов из Binance себе в портфель для real-time обновления и просмотра цены',
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
					'text-base antialiased',
					'flex flex-col isolate',
					inter.className
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
