import { CoinGeckoTable } from '@/features'
import { cn } from '@/shared'
import { WelcomeAccordion } from '@/widgets'

export default function Home() {
	return (
		<>
			<CoinGeckoTable key={'leaders-tokens'} />

			<WelcomeAccordion />

			<CoinGeckoTable key={'outsiders-tokens'} reqParams={{ page: 2 }} />
		</>
	)
}
