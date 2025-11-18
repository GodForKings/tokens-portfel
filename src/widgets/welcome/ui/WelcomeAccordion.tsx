import type { FC } from 'react'

import { VariableAccordion } from '@/shared/components'
import { welcomeAccordionFAQItems } from '../lib/data.welcome'

export const WelcomeAccordion: FC = () => {
	return <VariableAccordion faqItems={welcomeAccordionFAQItems} />
}
