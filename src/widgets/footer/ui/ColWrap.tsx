import type { FC } from 'react'

import { cn } from '@/shared'

interface ColWrapProps {
	children: React.ReactNode
}

export const ColWrap: FC<ColWrapProps> = props => {
	const { children } = props

	return <div className={cn('flex flex-col gap-3')}>{children}</div>
}
