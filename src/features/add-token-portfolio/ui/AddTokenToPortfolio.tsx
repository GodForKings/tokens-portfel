'use client'

import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'

import { cn } from '@/shared'

import { useWallet } from '../lib/hooks'

import type { IAsset } from '../model/types'
import type { FC } from 'react'

export const AddTokenToPortfolio: FC = () => {
	const { assets, totalValue, add, remove, clear, updatePrice } = useWallet()

	return (
		<Card className='w-full p-3'>
			<ul className={cn('grid grid-cols-4 place-content-stretch gap-4')}>
				{assets.map((active: IAsset) => (
					<Badge variant={'info'} appearance={'outline'} key={active.asset}>
						{active.asset} ${active.price}
					</Badge>
				))}
			</ul>
		</Card>
	)
}
