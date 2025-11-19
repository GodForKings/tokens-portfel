import type { FC } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { Data, PAGES, cn } from '@/shared'
import { NavMenu } from '@/shared/components'

export const Header: FC = () => {
	return (
		<header
			className={cn(
				'flex items-center justify-between',
				'sticky top-0 z-50 w-full backdrop-blur-sm supports-backdrop-filter:bg-background/60 px-6 py-2',
				'border-b border-border'
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
