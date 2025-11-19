import type { FC } from 'react'
import type { FAQItem } from '@/shared'

import {
	Accordion,
	AccordionHeader,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from '@/shared/components/ui/base-accordion'

interface VariableAccordionProps {
	faqItems: FAQItem[]
	variant?: 'default' | 'outline' | 'solid' | null
	multiple?: boolean | undefined
	indicator?: 'plus' | 'arrow' | 'none'
}

export const VariableAccordion: FC<VariableAccordionProps> = props => {
	const { faqItems } = props

	return (
		<Accordion
			variant='solid'
			indicator='plus'
			multiple={true}
			className='w-full'
		>
			{faqItems?.map(item => (
				<AccordionItem value={`reui-${item.id}`} key={item.id}>
					<AccordionHeader>
						<AccordionTrigger>{item.question}</AccordionTrigger>
					</AccordionHeader>

					<AccordionPanel>{item.answer}</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	)
}
