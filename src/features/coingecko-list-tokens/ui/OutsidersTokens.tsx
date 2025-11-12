'use client'
import type { FC } from 'react'

import { apiCoinGecko } from '@/shared'
import DataGridView from '@/shared/components/data-grid/DataGridView'
import { BASE_POOLING } from '@/shared/constants'

export const OutsidersTokens: FC = () => {
	const { data, isLoading } = apiCoinGecko.useFetchTokensCoinGeckoQuery(
		{ page: 2 },
		{ pollingInterval: BASE_POOLING }
	)

	return <DataGridView isLoading={isLoading} dataTokens={data} />
}
