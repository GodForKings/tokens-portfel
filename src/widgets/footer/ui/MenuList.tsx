'use client'

import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'

import { cn } from '@/shared'

import type { Data } from '@/shared'
import type { FC } from 'react'

interface MenuListProps {
	MenuItems: Data.IMenuItem[]
	onNewPage: boolean
}

export const MenuList: FC<MenuListProps> = props => {
	const { MenuItems, onNewPage = false } = props

	return (
		<ul className={cn('space-y-2 text-sm')}>
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
