import type { IToken } from '@/entities'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { apiTokens } from '@/features'

interface TokenState {
	tokens: IToken[]
	isLoading: boolean
	error: string
}

const initialState: TokenState = {
	tokens: [],
	isLoading: false,
	error: '',
}

export const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addMatcher(apiTokens.endpoints.fetchAllTokens.matchPending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addMatcher(
				apiTokens.endpoints.fetchAllTokens.matchFulfilled,
				(state, { payload }: PayloadAction<IToken[]>) => {
					state.isLoading = false
					state.tokens = payload
						.filter(t => t.symbol.includes('USDT') && Number(t.lastPrice) > 0)
						.map(t => ({
							...t,
							symbol: t.symbol.replace(/USDT$/, ''),
							lastPrice: t.lastPrice,
							priceChangePercent: t.priceChangePercent,
						}))
				}
			)
			.addMatcher(
				apiTokens.endpoints.fetchAllTokens.matchRejected,
				(state, { error }) => {
					state.isLoading = false
					state.error = error.message || 'Failed to load tokens'
				}
			)
	},
})

export default tokenSlice.reducer
