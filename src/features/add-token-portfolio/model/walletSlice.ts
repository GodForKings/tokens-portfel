import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { IAsset } from './types'
import type { IToken, ITokenWSS } from '@/entities'
import { apiTokens } from '@/features'

interface WalletState {
	assets: IAsset[]
	totalValue: number
	error: string
}

const initialState: WalletState = {
	assets: [],
	totalValue: 0,
	error: '',
}

const STORAGE_KEY = 'my_assets'

const loadFromStorage = (): IAsset[] => {
	try {
		const data = localStorage.getItem(STORAGE_KEY)
		return data ? JSON.parse(data) : []
	} catch {
		localStorage.removeItem(STORAGE_KEY)
		return []
	}
}

const saveToStorage = (assets: IAsset[]) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(assets))
	} catch (e) {
		console.error('Failed to save to localStorage', e)
	}
}

const recalculate = (assets: IAsset[]): { total: number; shares: IAsset[] } => {
	const total = assets.reduce((sum, a) => sum + a.totalCost, 0)
	const shares =
		total > 0
			? assets.map(a => ({ ...a, shareInPortfolio: a.totalCost / total }))
			: assets
	return { total, shares }
}

export const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		preloadFromStorage(state) {
			state.assets = loadFromStorage()
			const { total, shares } = recalculate(state.assets)
			state.totalValue = total
			state.assets = shares
		},

		clearWallet(state) {
			state.assets = []
			state.totalValue = 0
			localStorage.removeItem(STORAGE_KEY)
		},

		removeAsset(state, action: PayloadAction<string>) {
			state.assets = state.assets.filter(a => a.asset !== action.payload)
			const { total, shares } = recalculate(state.assets)
			state.totalValue = total
			state.assets = shares
			saveToStorage(state.assets)
		},

		addToken(
			state,
			action: PayloadAction<{
				asset: string
				quantity: number
				price: number
				changeDay: number
			}>
		) {
			const { asset, quantity, price, changeDay } = action.payload
			const existing = state.assets.find(a => a.asset === asset)

			if (existing) {
				existing.quantity += quantity
				existing.price = price
				existing.totalCost = price * existing.quantity
			} else {
				state.assets.push({
					asset,
					quantity,
					price,
					totalCost: price * quantity,
					changeDay,
					shareInPortfolio: 0,
				})
			}

			const { total, shares } = recalculate(state.assets)
			state.totalValue = total
			state.assets = shares
			saveToStorage(state.assets)
		},

		updatePrice(state, action: PayloadAction<ITokenWSS>) {
			const { s, c } = action.payload
			const symbol = s.replace('USDT', '')
			let updated = false

			state.assets.forEach(a => {
				if (a.asset === symbol) {
					a.price = c
					a.totalCost = a.quantity * c
					updated = true
				}
			})

			if (updated) {
				const { total, shares } = recalculate(state.assets)
				state.totalValue = total
				state.assets = shares
				saveToStorage(state.assets)
			}
		},
	},

	extraReducers: builder => {
		builder
			/* Для синхронизации цены токена из localStorage */
			.addMatcher(
				apiTokens.endpoints.fetchAllTokens.matchFulfilled,
				(state, { payload }: PayloadAction<IToken[]>) => {
					const tokenMap = new Map<string, number>(
						payload
							.filter(t => t.symbol.endsWith('USDT'))
							.map(t => [t.symbol.replace('USDT', ''), Number(t.lastPrice)])
					)

					let updated = false
					state.assets.forEach(asset => {
						const newPrice = tokenMap.get(asset.asset)
						if (newPrice !== undefined && newPrice !== asset.price) {
							asset.price = newPrice
							asset.totalCost = asset.quantity * newPrice
							updated = true
						}
					})

					if (updated) {
						const { total, shares } = recalculate(state.assets)
						state.totalValue = total
						state.assets = shares
						saveToStorage(state.assets)
					}
				}
			)
	},
})

export const {
	clearWallet,
	removeAsset,
	addToken,
	updatePrice,
	preloadFromStorage,
} = walletSlice.actions

export default walletSlice.reducer
