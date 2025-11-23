import { Data, cn } from '@/shared'

import { ColWrap } from './ColWrap'
import { MenuList } from './MenuList'

import type { FC } from 'react'

export const Footer: FC = () => {
	return (
		<footer className='border-border border-t'>
			<div className={cn('grid gap-8 md:grid-cols-3', 'container px-5 py-10')}>
				{/* Column 1 */}
				<ColWrap>
					<h2 className='text-primary text-xl font-semibold'>Crypto Dashboard</h2>

					<p className='text-muted-foreground text-sm leading-relaxed'>
						Инструмент для отслеживания криптовалют, анализа рынка и управления портфелем в реальном
						времени.
					</p>

					<p className='text-muted-foreground text-xs'>
						© {new Date().getFullYear()} ITDextra. Все права защищены.
					</p>
				</ColWrap>

				{/* Column 2 */}
				<ColWrap>
					<h3 className='text-primary font-semibold'>Навигация</h3>

					<MenuList MenuItems={Data.NAV_MENU} onNewPage={false} />
				</ColWrap>

				{/* Column 3 */}
				<ColWrap>
					<h3 className='text-primary font-semibold'>Контакты и ресурсы</h3>

					<MenuList MenuItems={Data.CONTACT_MENU} onNewPage={true} />
				</ColWrap>
			</div>
		</footer>
	)
}
