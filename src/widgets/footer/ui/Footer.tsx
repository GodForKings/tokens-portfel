import type { FC } from 'react'

import { Data, cn } from '@/shared'
import { MenuList } from './MenuList'
import { ColWrap } from './ColWrap'

export const Footer: FC = () => {
	return (
		<footer className='border-t border-border'>
			<div className={cn('grid md:grid-cols-3 gap-8', 'container py-10 px-5')}>
				{/* Column 1 */}
				<ColWrap>
					<h2 className='text-xl font-semibold text-primary'>
						Crypto Dashboard
					</h2>

					<p className='text-muted-foreground text-sm leading-relaxed'>
						Инструмент для отслеживания криптовалют, анализа рынка и управления
						портфелем в реальном времени.
					</p>

					<p className='text-muted-foreground text-xs'>
						© {new Date().getFullYear()} ITDextra. Все права защищены.
					</p>
				</ColWrap>

				{/* Column 2 */}
				<ColWrap>
					<h3 className='font-semibold text-primary'>Навигация</h3>

					<MenuList MenuItems={Data.NAV_MENU} onNewPage={false} />
				</ColWrap>

				{/* Column 3 */}
				<ColWrap>
					<h3 className='font-semibold text-primary'>Контакты и ресурсы</h3>

					<MenuList MenuItems={Data.CONTACT_MENU} onNewPage={true} />
				</ColWrap>
			</div>
		</footer>
	)
}
