import type { Metadata } from 'next'
import type { FC } from 'react'

type TokenParams = { token: string | string[] | undefined }

export async function generateMetadata({
	params,
}: {
	params: Promise<TokenParams>
}): Promise<Metadata> {
	return {
		title: `Статистика монеты ${(await params).token}`,
		description: `Детальная информация о криптовалюте ${(await params).token}`,
	}
}

export default async function TokenPage({
	params,
}: {
	params: Promise<TokenParams>
}) {
	const { token } = await params

	return <div className='h-[80dvh]'>@{token}</div>
}
