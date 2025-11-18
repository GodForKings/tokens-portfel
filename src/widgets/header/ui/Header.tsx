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
				'bg-black border-b border-white/10 px-6 py-4'
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
