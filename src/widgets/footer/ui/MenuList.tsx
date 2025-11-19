'use client'
import type { FC } from 'react'

import Link from 'next/link'

import { Data, cn } from '@/shared'
import { Button } from '@/shared/components/ui/button'

interface MenuListProps {
	MenuItems: Data.IMenuItem[]
	onNewPage: boolean
}

export const MenuList: FC<MenuListProps> = props => {
	const { MenuItems, onNewPage = false } = props

	return (
		<ul className={cn('text-sm space-y-2')}>
			{MenuItems.map(item => (
				<li key={item.href}>
					<Button mode='link' underline='solid'>
						<Link
							className='hover:text-primary transition'
							href={item.href}
							target={onNewPage ? '_blank' : '_self'}
						>
							{item.name}
						</Link>
					</Button>
				</li>
			))}
		</ul>
	)
}
