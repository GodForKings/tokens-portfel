import type { CoinGeckoMarketRequest } from '@/shared'

export const DEFAULT_PARAMETERS: Readonly<CoinGeckoMarketRequest> = {
	vs_currency: 'usd',
	order: 'market_cap_desc',
	per_page: 250,
	page: 1,
	price_change_percentage: ['1h', '24h', '7d'],
}
