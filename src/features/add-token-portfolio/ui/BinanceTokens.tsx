'use client'
import { CustomTokenTable } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { BASE_POOLING } from '@/shared/constants'

import { useAppSelector } from '@/entities'
import { apiTokens } from '@/features'

import type { FC } from 'react'

export const BinanceTokens: FC = () => {
	const { refetch } = apiTokens.useFetchAllTokensQuery(undefined, {
		pollingInterval: BASE_POOLING,
	})

	const tokens = useAppSelector(state => state.tokens)

	return (
		<CustomTokenTable dataTokens={tokens.tokens} isLoading={tokens.isLoading}>
			<Button onClick={refetch}>Обновить</Button>
		</CustomTokenTable>
	)
}
