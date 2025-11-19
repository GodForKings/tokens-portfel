import { PAGES } from '@/shared'

export interface IMenuItem {
	href: string
	name: string
	description: string
}

export const NAV_MENU: IMenuItem[] = [
	{
		href: PAGES.HOME,
		name: 'Home',
		description: 'Главная страница: обзор рынка, тренды и ключевые метрики.',
	},
	{
		href: PAGES.BINANCE,
		name: 'Binance',
		description:
			'Аналитика и данные токенов с Binance: курсы, изменения и статистика.',
	},
	{
		href: PAGES.ABOUT,
		name: 'About',
		description: 'Информация о проекте, его возможностях и принципах работы.',
	},
]
