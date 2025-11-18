import type { CategoryTokens, CategoryNames } from '@/shared'

export { BINANCE, COINGECKO } from './public.api'

export const PAGINATION = {
	DEFAULT_LIMIT: 10,
	PAGE_SIZE: [5, 10, 15, 25, 50],
} as const

export const BASE_POOLING: number = 1000 * 120

export const CATEGORY_TOKENS: Readonly<Record<CategoryNames, CategoryTokens>> =
	{
		DeFi: 'decentralized_finance_defi',
		Стейблкоины: 'stablecoins',
		DEX: 'decentralized-exchange',
		YieldAggregators: 'yield-aggregator',
		Оракулы: 'oracle',
		Приватность: 'privacy-coins',
		'Layer 1': 'layer-1',
		'Layer 2': 'layer-2',
		MemeTokens: 'meme-token',
		NFT: 'non-fungible-tokens-nft',
		GameFi: 'gaming',
		'AI-токены': 'artificial-intelligence',
		RWA: 'real-world-assets-rwa',
		Бриджы: 'bridge',
		CEX: 'centralized-exchange',
		Деривативы: 'derivatives',
		LiquidStaking: 'liquid-staking',
		Restaking: 'restaking',
		DePIN: 'depin',
	} as const
