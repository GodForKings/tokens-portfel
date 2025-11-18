import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { CoinGeckoTable } from '@/features'
import { PAGES, type CategoryTokens, cn } from '@/shared'

import { CATEGORY_TOKENS } from '@/shared/constants'

type CategoryParams = { name: string | undefined }

export async function generateMetadata({
	params,
}: {
	params: Promise<CategoryParams>
}): Promise<Metadata> {
	return {
		title: `Монеты категории: ${(await params).name}`,
		description: `Статистика, аналитика популярных монет по категории: ${
			(await params).name
		}`,
	}
}

export default async function CategoryPage({
	params,
}: {
	params: Promise<CategoryParams>
}) {
	const { name } = await params

	if (
		typeof name === 'string' &&
		Object.values(CATEGORY_TOKENS).some(
			el => el.toLowerCase() === name.toLowerCase()
		)
	) {
		return (
			<div className={cn('relative min-h-fit')}>
				<CoinGeckoTable reqParams={{ category: name as CategoryTokens }} />
			</div>
		)
	} else redirect(PAGES.HOME)
}
