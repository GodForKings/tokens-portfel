import type { FC } from 'react'
import { PAGES, type IBreadcrumbItem } from '@/shared'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/components/ui/base-breadcrumb'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Home } from 'lucide-react'

interface BreadcrumbCardProps {
	listBreadcrumb: IBreadcrumbItem[]
}

export const BreadcrumbCard: FC<BreadcrumbCardProps> = props => {
	const { listBreadcrumb } = props

	return (
		<Card>
			<CardContent className='px-4 py-2.5'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href={PAGES.HOME}>
								<Home className='size-4' />
							</BreadcrumbLink>
						</BreadcrumbItem>

						{listBreadcrumb?.map((item, index) => (
							<ul key={item.href} className='flex items-center justify-center'>
								<BreadcrumbSeparator />

								{index === listBreadcrumb.length - 1 ? (
									<BreadcrumbItem>
										<BreadcrumbPage>{item?.icon || item.label}</BreadcrumbPage>
									</BreadcrumbItem>
								) : (
									<BreadcrumbItem>
										<BreadcrumbLink href={item.href}>
											{item?.icon || item.label}
										</BreadcrumbLink>
									</BreadcrumbItem>
								)}
							</ul>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</CardContent>
		</Card>
	)
}
