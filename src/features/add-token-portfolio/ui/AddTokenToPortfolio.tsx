'use client'
import type { FC } from 'react'
import type { IAsset } from '../model/types'

import { cn } from '@/shared'
import { useWallet } from '../lib/hooks'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'

export const AddTokenToPortfolio: FC = () => {
	const { assets, totalValue, add, remove, clear, updatePrice } = useWallet()

	return (
		<Card className='p-3 w-full'>
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
