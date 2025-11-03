import { configureStore } from '@reduxjs/toolkit'

import { apiTokens } from '@/features'
import tokenReducer from '@/features/add-token-portfolio/model/tokenSlice'
import walletReducer from '@/features/add-token-portfolio/model/walletSlice'

export const store = configureStore({
	reducer: {
		[apiTokens.reducerPath]: apiTokens.reducer,
		tokens: tokenReducer,
		wallet: walletReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiTokens.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
