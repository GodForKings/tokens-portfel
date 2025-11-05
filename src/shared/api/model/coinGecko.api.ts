import type { CoinGeckoMarketRequest, CoinGeckoToken } from '@/shared'
import { COINGECKO } from '@/shared/constants'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiCoinGecko = createApi({
	reducerPath: 'apiCoinGecko ',
	baseQuery: fetchBaseQuery({ baseUrl: COINGECKO.COINS_V3 }),
	tagTypes: ['CoinGeckoTokens'],
	endpoints: build => ({
		fetchTokensCoinGecko: build.query<
			CoinGeckoToken[],
			Partial<CoinGeckoMarketRequest>
		>({
			query: () => ({
				url: '/coins/markets',
				params: {
					vs_currency: 'usd',
					order: 'market_cap_desc',
					per_page: '100',
					page: '1',
					price_change_percentage: '24h', //1h,24h,7d,14d,30d,200d,1y
				},
				cache: 'default',
			}),
			providesTags: response => ['CoinGeckoTokens'],
		}),
	}),
})

export const { useFetchTokensCoinGeckoQuery } = apiCoinGecko
