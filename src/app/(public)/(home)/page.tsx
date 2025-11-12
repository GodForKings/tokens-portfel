import { BestCoinGecko, OutsidersTokens } from '@/features'
import { cn } from '@/shared'
import { WelcomeAccordion } from '@/widgets'

export default function Home() {
	return (
		<main className={cn('flex flex-col gap-2', 'p-1 lg:p-4 min-h-screen')}>
			<WelcomeAccordion />

			<BestCoinGecko />

			<OutsidersTokens />
		</main>
	)
}
