import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { CoinGeckoToken, CoinGeckoMarketRequest } from '@/shared'

import { COINGECKO } from '@/shared/constants'
import { DEFAULT_PARAMETERS } from '@/shared'

export const apiCoinGecko = createApi({
	reducerPath: 'apiCoinGecko ',
	baseQuery: fetchBaseQuery({ baseUrl: COINGECKO.COINS_V3 }),
	tagTypes: ['CoinGeckoTokens'],
	endpoints: build => ({
		fetchTokensCoinGecko: build.query<
			CoinGeckoToken[],
			Partial<CoinGeckoMarketRequest> | null
		>({
			query: params => ({
				url: '/coins/markets',
				params: { ...DEFAULT_PARAMETERS, ...params },
				cache: 'default',
			}),
			providesTags: response => ['CoinGeckoTokens'],
		}),
	}),
})

export const { useFetchTokensCoinGeckoQuery } = apiCoinGecko
