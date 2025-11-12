import type { FC } from 'react'

import {
	Accordion,
	AccordionHeader,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from '@/shared/components/ui/base-accordion'

export const VariableAccordion: FC = () => {
	return (
		<Accordion variant='solid' multiple={false} className='w-full lg:w-[75%]'>
			<AccordionItem value='reui-1'>
				<AccordionHeader>
					<AccordionTrigger>Вопрос?</AccordionTrigger>
				</AccordionHeader>
				<AccordionPanel>
					Ответ ReUI provides ready-to-use CRUD examples for developers.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem value='reui-2'>
				<AccordionHeader>
					<AccordionTrigger>Who benefits from ReUI?</AccordionTrigger>
				</AccordionHeader>
				<AccordionPanel>
					Developers looking to save time with pre-built CRUD solutions.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem value='reui-3'>
				<AccordionHeader>
					<AccordionTrigger>Why choose ReUI?</AccordionTrigger>
				</AccordionHeader>
				<AccordionPanel>
					ReUI simplifies development with plug-and-play CRUDs.
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}
