'use client'
import { Provider } from 'react-redux'

import { store } from '../model/store'

import type { FC } from 'react'

interface StoreProviderProps {
	children: React.ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = props => {
	const { children } = props

	return <Provider store={store}>{children}</Provider>
}
