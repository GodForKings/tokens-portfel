import Link from 'next/link'

import { PAGES, cn } from '@/shared'

export default function NotFound() {
	return (
		<div className={cn('min-h-screen px-4', 'flex flex-col items-center justify-center')}>
			<h1 className='mb-4 text-7xl font-bold'>404</h1>

			<p className='mb-6 text-neutral-600'>This page not exist. Or maybe it moved.</p>

			<Link href={PAGES.HOME} className='text-sm hover:underline'>
				← Back to home
			</Link>
		</div>
	)
}
