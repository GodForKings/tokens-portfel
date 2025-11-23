import { redirect } from 'next/navigation'

import { BaseAlertDialogDismiss, BreadcrumbCard } from '@/shared/components'
import { CATEGORY_TOKENS } from '@/shared/constants'

import { CoinGeckoTable } from '@/features'
import { PAGES, cn } from '@/shared'

import type { Metadata } from 'next'

type CategoryParams = { name: string | undefined }

export async function generateMetadata({
	params,
}: {
	params: Promise<CategoryParams>
}): Promise<Metadata> {
	return {
		title: `Монеты категории: ${(await params).name}`,
		description: `Статистика, аналитика популярных монет по категории: ${(await params).name}`,
	}
}

export default async function CategoryPage({ params }: { params: Promise<CategoryParams> }) {
	const { name } = await params

	const category = CATEGORY_TOKENS.find(
		item => item.link.toLocaleLowerCase() === name?.toLocaleLowerCase(),
	)

	if (typeof name === 'string' && category) {
		return (
			<div className={cn('relative', 'flex flex-col items-start justify-center gap-4')}>
				<BreadcrumbCard listBreadcrumb={[{ label: category.name, href: category.link }]} />
				<CoinGeckoTable reqParams={{ category: category.link }}>
					<BaseAlertDialogDismiss
						textInBtn={'Об этой таблице'}
						titleText={category.name}
						descText={category.desc}
					/>
				</CoinGeckoTable>
			</div>
		)
	} else redirect(PAGES.HOME)
}
