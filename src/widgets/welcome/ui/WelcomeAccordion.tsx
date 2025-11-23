import { VariableAccordion } from '@/shared/components'

import { welcomeAccordionFAQItems } from '../lib/data.welcome'

import type { FC } from 'react'

export const WelcomeAccordion: FC = () => {
	return <VariableAccordion faqItems={welcomeAccordionFAQItems} />
}
