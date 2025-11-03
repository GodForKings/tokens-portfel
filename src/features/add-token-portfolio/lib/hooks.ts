import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/entities/store/lib/hooks'
import {
	preloadFromStorage,
	addToken,
	removeAsset,
	clearWallet,
	updatePrice,
} from '../model/walletSlice'

export const useWallet = () => {
	const dispatch = useAppDispatch()
	const { assets, totalValue } = useAppSelector(state => state.wallet)

	useEffect(() => {
		dispatch(preloadFromStorage())
	}, [dispatch])

	return {
		assets,

		totalValue,

		add: (payload: Parameters<typeof addToken>[0]) =>
			dispatch(addToken(payload)),

		remove: (asset: string) => dispatch(removeAsset(asset)),

		clear: () => dispatch(clearWallet()),

		updatePrice: (data: Parameters<typeof updatePrice>[0]) =>
			dispatch(updatePrice(data)),
	}
}
