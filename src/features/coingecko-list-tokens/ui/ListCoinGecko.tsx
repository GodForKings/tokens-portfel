'use client'
import type { FC } from 'react'

import { apiCoinGecko } from '@/shared'
import DataGridView from '@/shared/components/data-grid/DataGridView'

export const ListCoinGecko: FC = () => {
	const { data, isLoading } = apiCoinGecko.useFetchTokensCoinGeckoQuery(
		{},
		{ pollingInterval: 1000 * 120 }
	)
	return <DataGridView dataTokens={data} isLoading={isLoading} />
}
