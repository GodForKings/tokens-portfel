'use client'
import type { FC } from 'react'

import { apiCoinGecko } from '@/shared'
import DataGridView from '@/shared/components/data-grid/DataGridView'
import { BASE_POOLING } from '@/shared/constants'

export const BestCoinGecko: FC = () => {
	const { data, isLoading } = apiCoinGecko.useFetchTokensCoinGeckoQuery(null, {
		pollingInterval: BASE_POOLING,
	})

	return <DataGridView dataTokens={data} isLoading={isLoading} />
}
