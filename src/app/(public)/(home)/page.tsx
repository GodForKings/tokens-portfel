import { AddTokenToPortfolio } from '@/features'
import { ListCoinGecko } from '@/features/coingecko-list-tokens/ui/ListCoinGecko'
import { cn } from '@/shared'

export default function Home() {
	return (
		<main className={cn('flex flex-col gap-2', 'p-1 lg:p-4 min-h-screen')}>
			<ListCoinGecko />
		</main>
	)
}
