'use client'
import type { FC } from 'react'
import type { IAsset } from '../model/types'

import { useEffect } from 'react'

import {} from '@base-ui-components/react'

import { useAppSelector } from '@/entities/store/lib/hooks'
import { cn } from '@/shared'
import DataGridDemo from '@/shared/ui/components/data-grid/CrudTable'

import { apiTokens } from '../api/apiSlice'
import { useWallet } from '../lib/hooks'

export const AddTokenToPortfolio: FC = () => {
	const { data, isLoading } = apiTokens.useFetchAllTokensQuery(undefined, {
		pollingInterval: 2 * 60 * 1000,
	})

	const tokens = useAppSelector(state => state.tokens.tokens)

	const { assets, totalValue, add, remove, clear, updatePrice } = useWallet()

	useEffect(() => {
		!isLoading && console.log(data)
	}, [isLoading])

	return (
		<>
			<ul className={cn('grid grid-cols-4 place-content-stretch gap-4')}>
				{assets.map((active: IAsset) => (
					<li className='text-center' key={active.asset + active.asset}>
						{active.asset} ${active.price}
					</li>
				))}
			</ul>

			<DataGridDemo />
		</>
	)
}
