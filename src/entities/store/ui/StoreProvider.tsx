'use client'
import type { FC } from 'react'
import { Provider } from 'react-redux'

import { store } from '../model/store'

interface StoreProviderProps {
	children: React.ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = props => {
	const { children } = props

	return <Provider store={store}>{children}</Provider>
}
