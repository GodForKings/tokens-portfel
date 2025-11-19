import type { FC } from 'react'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/components/ui/base-alert-dialog'
import { Button } from '@/shared/components/ui/base-button'
import { Bell, BookOpenText, Info } from 'lucide-react'

interface BaseAlertDialogDismissProps {
	textInBtn: string
	titleText: string
	descText: string
}

export const BaseAlertDialogDismiss: FC<
	BaseAlertDialogDismissProps
> = props => {
	const { textInBtn, titleText, descText } = props

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<Button variant='primary'>
						<Info className='size-4' />

						{textInBtn}
					</Button>
				}
			/>

			<AlertDialogContent showDismissButton={true}>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<BookOpenText className='size-5 text-muted-foreground' />

						{titleText}
					</AlertDialogTitle>

					<AlertDialogDescription>{descText}</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	)
}
