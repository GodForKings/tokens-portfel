import { cn } from '@/shared'
import type { FC } from 'react'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: FC<LayoutProps> = props => {
	const { children } = props
	return (
		<main
			className={cn(
				'relative',
				'flex flex-col items-center gap-2 lg:gap-6',
				'p-2 lg:p-4 min-h-screen container'
			)}
		>
			{children}
		</main>
	)
}

export default Layout
