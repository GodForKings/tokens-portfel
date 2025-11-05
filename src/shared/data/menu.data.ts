import { PAGES } from '@/shared'

export interface IMenuItem {
	href: string
	name: string
}

export const NAV_MENU: IMenuItem[] = [
	{ href: PAGES.HOME, name: 'Home' },
	{ href: PAGES.BINANCE, name: 'Binance' },
	{ href: PAGES.ABOUT, name: 'About' },
]
