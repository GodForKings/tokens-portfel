import { PAGES } from '@/shared'

export interface IMenuItem {
	href: string
	name: string
	description: string
}

export const NAV_MENU: IMenuItem[] = [
	{ href: PAGES.HOME, name: 'Home', description: '' },
	{ href: PAGES.BINANCE, name: 'Binance', description: '' },
	{ href: PAGES.ABOUT, name: 'About', description: '' },
]
