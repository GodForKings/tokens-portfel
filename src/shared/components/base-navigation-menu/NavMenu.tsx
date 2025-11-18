'use client'
import type { FC } from 'react'

import Link from 'next/link'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuPopup,
	NavigationMenuPositioner,
	NavigationMenuTrigger,
} from '@/shared/components/ui/base-navigation-menu'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react'

import { Data, PAGES, cn } from '@/shared'
import { CATEGORY_TOKENS } from '@/shared/constants'

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink render={<Link href={href} />}>
				<div className='text-sm leading-none font-medium'>{title}</div>
				<p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
					{children}
				</p>
			</NavigationMenuLink>
		</li>
	)
}

interface NavMenuProps {
	menuItems: Data.IMenuItem[]
}

export const NavMenu: FC<NavMenuProps> = props => {
	const { menuItems } = props

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Меню</NavigationMenuTrigger>

					<NavigationMenuContent>
						<ul
							className={cn(
								'grid gap-2 lg:grid-cols-2',
								'md:w-[400px] lg:w-[500px]'
							)}
						>
							<li className='row-span-3'>
								<NavigationMenuLink
									render={
										<Link
											className='from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden select-none focus:shadow-md'
											href={PAGES.HOME}
										/>
									}
								>
									<div className='text-lg font-medium'>Главная Страница</div>

									<p className='text-muted-foreground text-sm leading-tight'>
										Здесь представлена вся информацию о популярных криптовалютах
									</p>
								</NavigationMenuLink>
							</li>

							{menuItems.map(item => (
								<ListItem
									href={item.href}
									title={item.name}
									key={item.description + item.href}
								>
									@{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>Категории</NavigationMenuTrigger>

					<NavigationMenuContent>
						<ul
							className={cn(
								'grid md:grid-cols-2 lg:grid-cols-3 gap-2',
								'md:w-[400px] lg:w-[500px]'
							)}
						>
							{Object.entries(CATEGORY_TOKENS).map(([label, slug]) => (
								<ListItem key={slug} href={PAGES.CATEGORY(slug)} title={label}>
									...
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>

			<NavigationMenuPositioner>
				<NavigationMenuPopup />
			</NavigationMenuPositioner>
		</NavigationMenu>
	)
}
