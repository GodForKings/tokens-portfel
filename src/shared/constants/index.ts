import type { ITokenCategoryList } from '@/shared'

export { BINANCE, COINGECKO } from './public.api'

export const PAGINATION = {
	DEFAULT_LIMIT: 10,
	PAGE_SIZE: [5, 10, 15, 25, 50],
} as const

export const BASE_POOLING: number = 1000 * 120

/**
 * Массив **категорий криптовалют**:
 * @id number
 * @link ссылка на страницу
 * @name названия
 * @desc описания
 */
export const CATEGORY_TOKENS: ITokenCategoryList[] = [
	{
		id: 1,
		link: 'decentralized_finance_defi',
		name: 'DeFi',
		desc: 'Экосистема децентрализованных финансов - протоколы без посредников.',
	},
	{
		id: 2,
		link: 'stablecoins',
		name: 'Стейблкоины',
		desc: 'Монеты, привязанные к стабильным активам: доллар, евро или золото.',
	},
	{
		id: 3,
		link: 'decentralized-exchange',
		name: 'DEX',
		desc: 'Децентрализованные биржи, где пользователи торгуют без централизованного контроля.',
	},
	{
		id: 4,
		link: 'yield-aggregator',
		name: 'YieldAggregators',
		desc: 'Протоколы для оптимизации доходности через автоматизацию стейкинга и фарминга.',
	},
	{
		id: 5,
		link: 'oracle',
		name: 'Оракулы',
		desc: 'Сервисы, передающие блокчейнам данные из реального мира.',
	},
	{
		id: 6,
		link: 'privacy-coins',
		name: 'Приватность',
		desc: 'Криптовалюты с упором на анонимность и скрытие транзакций.',
	},
	{
		id: 7,
		link: 'layer-1',
		name: 'Layer 1',
		desc: 'Базовые блокчейны - фундамент экосистемы (Ethereum, Solana и др.).',
	},
	{
		id: 8,
		link: 'layer-2',
		name: 'Layer 2',
		desc: 'Решения второго уровня для ускорения и удешевления транзакций.',
	},
	{
		id: 9,
		link: 'meme-token',
		name: 'MemeTokens',
		desc: 'Мемные монеты - сообщественные и хайповые токены.',
	},
	{
		id: 10,
		link: 'non-fungible-tokens-nft',
		name: 'NFT',
		desc: 'Токены уникальных цифровых объектов: искусство, коллекции, игровые предметы.',
	},
	{
		id: 11,
		link: 'gaming',
		name: 'GameFi',
		desc: 'Игровые проекты с элементами токеномики и P2E-механиками.',
	},
	{
		id: 12,
		link: 'artificial-intelligence',
		name: 'AI-токены',
		desc: 'Проекты, использующие искусственный интеллект и машинное обучение.',
	},
	{
		id: 13,
		link: 'real-world-assets-rwa',
		name: 'RWA',
		desc: 'Токенизация реальных активов: недвижимость, сырьё, облигации.',
	},
	{
		id: 14,
		link: 'liquid-staking',
		name: 'LiquidStaking',
		desc: 'Протоколы ликвидного стейкинга, позволяющие получать токены взамен заблокированных активов.',
	},
	{
		id: 15,
		link: 'restaking',
		name: 'Restaking',
		desc: 'Технологии повторного стейкинга для получения дополнительной доходности.',
	},
	{
		id: 16,
		link: 'depin',
		name: 'DePIN',
		desc: 'Децентрализованные физические сети: интернет, хранение данных, вычисления.',
	},
]
