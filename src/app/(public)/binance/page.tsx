import { BreadcrumbCard } from '@/shared/components'

import { AddTokenToPortfolio, BinanceTokens } from '@/features'
import { PAGES } from '@/shared'

import type { Metadata } from 'next'
import type { FC } from 'react'

export const metadata: Metadata = {
	title: 'Список монет на бирже Binance | Актуальные цены криптовалют Binance',
	description:
		'Токены, монеты, активы которые в настоящий момент доступны для трейдинга на бирже Binance, актуальная цена, реал-тайм обновление цены',
}

const Binance: FC = () => {
	return (
		<>
			<BreadcrumbCard listBreadcrumb={[{ label: 'Binance', href: PAGES.BINANCE }]} />

			<BinanceTokens />

			<AddTokenToPortfolio />
		</>
	)
}

export default Binance
