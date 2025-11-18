import { CoinGeckoTable } from '@/features'
import { cn } from '@/shared'
import { WelcomeAccordion } from '@/widgets'

export default function Home() {
	return (
		<main
			className={cn(
				'relative',
				'flex flex-col items-center gap-2 lg:gap-6',
				'p-1 lg:p-4 min-h-screen'
			)}
		>
			<CoinGeckoTable key={'leaders-tokens'} />

			<WelcomeAccordion />

			<CoinGeckoTable key={'outsiders-tokens'} reqParams={{ page: 2 }} />
		</main>
	)
}
