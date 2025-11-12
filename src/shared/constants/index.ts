import type { CategoryTokens } from '@/shared'

export { BINANCE, COINGECKO } from './public.api'

export const PAGINATION = {
	DEFAULT_LIMIT: 10,
	PAGE_SIZE: [5, 10, 15, 25, 50],
} as const

export const BASE_POOLING: number = 1000 * 120

export const CATEGORY_TOKENS: Readonly<Record<string, CategoryTokens>> = {
	'Децентрализованные финансы': 'decentralized_finance_defi',
	Стейблкоины: 'stablecoins',
	'Децентрализованные биржи': 'decentralized_exchange',
	Кредитование: 'lending',
	'Yield farming': 'yield_farming',
	Оракулы: 'oracles',
	Приватность: 'privacy',
	'Масштабируемость (L2)': 'scaling',
	'Мем-токены': 'meme_tokens',
}
