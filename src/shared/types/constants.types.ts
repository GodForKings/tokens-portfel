import type { CategoryTokens } from '@/shared'

export type CategoryNames =
	| 'DeFi'
	| 'Стейблкоины'
	| 'DEX'
	| 'YieldAggregators'
	| 'Оракулы'
	| 'Приватность'
	| 'Layer 1'
	| 'Layer 2'
	| 'MemeTokens'
	| 'NFT'
	| 'GameFi'
	| 'AI-токены'
	| 'RWA'
	| 'LiquidStaking'
	| 'Restaking'
	| 'DePIN'

export interface ITokenCategoryList {
	id: number
	link: CategoryTokens
	name: CategoryNames
	desc: string
}
