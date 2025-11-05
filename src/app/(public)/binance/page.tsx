import type { Metadata } from 'next'
import type { FC } from 'react'

import { AddTokenToPortfolio } from '@/features'

export const metadata: Metadata = {
	title: 'Список монет на бирже Binance | Актуальные цены криптовалют Binance',
	description:
		'Токены, монеты, активы которые в настоящий момент доступны для трейдинга на бирже Binance, актуальная цена, реал-тайм обновление цены',
}

const Binance: FC = () => {
	return (
		<main className='p-1 lg:p-4 min-h-screen'>
			<AddTokenToPortfolio />
		</main>
	)
}

export default Binance
