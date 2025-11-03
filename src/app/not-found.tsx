import Link from 'next/link'

import { PAGES, cn } from '@/shared'

export default function NotFound() {
	return (
		<div
			className={cn(
				'min-h-screen px-4',
				'flex flex-col items-center justify-center'
			)}
		>
			<h1 className='text-7xl font-bold mb-4'>404</h1>

			<p className='text-neutral-600 mb-6'>
				This page not exist. Or maybe it moved.
			</p>

			<Link href={PAGES.HOME} className='text-sm hover:underline'>
				← Back to home
			</Link>
		</div>
	)
}
