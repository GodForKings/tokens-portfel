'use client'
import type { FC } from 'react'
import type { IAsset } from '../model/types'

import { useAppSelector } from '@/entities/store/lib/hooks'
import { cn } from '@/shared'
import { apiTokens } from '../api/apiSlice'
import { useWallet } from '../lib/hooks'

export const AddTokenToPortfolio: FC = () => {
	const { data, isLoading } = apiTokens.useFetchAllTokensQuery(undefined, {
		pollingInterval: 2 * 60 * 1000,
	})

	const tokens = useAppSelector(state => state.tokens.tokens)
	console.log(tokens)

	const { assets, totalValue, add, remove, clear, updatePrice } = useWallet()

	return (
		<ul className={cn('grid grid-cols-4 place-content-stretch gap-4')}>
			{assets.map((active: IAsset) => (
				<li className='text-center' key={active.asset + active.asset}>
					{active.asset} ${active.price}
				</li>
			))}
		</ul>
	)
}
