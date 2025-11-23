import Image from 'next/image'
import Link from 'next/link'

import { NavMenu } from '@/shared/components'

import { Data, PAGES, cn } from '@/shared'

import type { FC } from 'react'

export const Header: FC = () => {
	return (
		<header
			className={cn(
				'flex items-center justify-between',
				'supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full px-6 py-2 backdrop-blur-sm',
				'border-border border-b',
			)}
		>
			<Link href={PAGES.HOME} className=''>
				<Image
					priority={true}
					src='/vercel.svg'
					alt='Logo itdextra crypto'
					className='rotate-90'
					width={28}
					height={28}
				/>
			</Link>

			<NavMenu menuItems={Data.NAV_MENU} />
		</header>
	)
}
