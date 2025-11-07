import type { CoinGeckoMarketRequest, CoinGeckoToken } from '@/shared'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DEFAULT_PARAMETERS } from '../lib/defaultInit.tokenApi'
import { COINGECKO } from '@/shared/constants'

export const apiCoinGecko = createApi({
	reducerPath: 'apiCoinGecko ',
	baseQuery: fetchBaseQuery({ baseUrl: COINGECKO.COINS_V3 }),
	tagTypes: ['CoinGeckoTokens'],
	endpoints: build => ({
		fetchTokensCoinGecko: build.query<
			CoinGeckoToken[],
			Partial<CoinGeckoMarketRequest>
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
