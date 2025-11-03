import type { IToken } from '@/entities'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BINANCE } from '@/shared/constants'

export const apiTokens = createApi({
	reducerPath: 'apiTokens',
	baseQuery: fetchBaseQuery({ baseUrl: BINANCE.API_V3 }),
	tagTypes: ['BinanceToken'],
	endpoints: builder => ({
		fetchAllTokens: builder.query<IToken[], void>({
			query: () => ({
				url: '/ticker/24hr',
				method: 'GET',
			}),
			providesTags: ['BinanceToken'],
		}),
	}),
})

export const { useFetchAllTokensQuery } = apiTokens
