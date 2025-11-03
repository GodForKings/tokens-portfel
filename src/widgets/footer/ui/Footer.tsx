import type { FC } from 'react'

import { cn } from '@/shared'

export const Footer: FC = () => {
	return (
		<footer
			className={cn('grid place-content-center', 'h-50', 'border-t bg-black')}
		>
			The basement is still being developed
		</footer>
	)
}
