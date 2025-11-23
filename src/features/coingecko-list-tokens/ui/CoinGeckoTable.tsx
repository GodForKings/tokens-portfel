'use client'

import { DataGridView } from '@/shared/components'
import { BASE_POOLING } from '@/shared/constants'

import { apiCoinGecko } from '@/shared'

import type { CoinGeckoMarketRequest } from '@/shared'
import type { FC } from 'react'

interface CoinGeckoTableProps {
	reqParams?: Partial<CoinGeckoMarketRequest>
	children?: React.ReactNode
}

export const CoinGeckoTable: FC<CoinGeckoTableProps> = props => {
	const { reqParams, children } = props

	const { data, isLoading } = apiCoinGecko.useFetchTokensCoinGeckoQuery(
		{ ...reqParams },
		{ pollingInterval: BASE_POOLING },
	)
	return (
		<DataGridView isLoading={isLoading} dataTokens={data}>
			{children}

			<img></img>
		</DataGridView>
	)
}
