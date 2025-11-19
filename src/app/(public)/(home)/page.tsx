import { CoinGeckoTable } from '@/features'
import { cn } from '@/shared'
import { BaseAlertDialogDismiss } from '@/shared/components'
import { WelcomeAccordion } from '@/widgets'

export default function Home() {
	return (
		<>
			<CoinGeckoTable key={'leaders-tokens'}>
				<BaseAlertDialogDismiss
					textInBtn='Описание'
					titleText='Топ 250 токенов по капитализации'
					descText='В этот список входят ведущие криптовалюты с наибольшей рыночной капитализацией. Данные обновляются в реальном времени и отражают ключевых лидеров рынка по ликвидности, объёму торгов и общей оценке проектов.'
				/>
			</CoinGeckoTable>

			<WelcomeAccordion />

			<CoinGeckoTable key={'outsiders-tokens'} reqParams={{ page: 2 }}>
				<BaseAlertDialogDismiss
					textInBtn='Описание'
					titleText='Токены на позициях 250-500'
					descText='Здесь представлены проекты, которые идут сразу после топ - 250 по капитализации. Это растущие или менее капитализированные токены, которые могут обладать высокой волатильностью и потенциалом роста.'
				/>
			</CoinGeckoTable>
		</>
	)
}
