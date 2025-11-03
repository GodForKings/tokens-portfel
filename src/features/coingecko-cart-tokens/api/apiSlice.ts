import { COINGECKO } from '@/shared/constants/public.api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiCoingecko = createApi({
	reducerPath: 'apiCoingecko',
	baseQuery: fetchBaseQuery({ baseUrl: COINGECKO.COINS_V3 }),
	tagTypes: ['CoingeckoTokens'],
	endpoints: build => ({
		fetchTokens: build.query<any, any>({
			query: () => ({
				url: '',
				params: {},
				cache: 'default',
			}),
			providesTags: response => ['CoingeckoTokens'],
		}),
	}),
})
