'use client'
import type {
	ColumnDef,
	PaginationState,
	SortingState,
} from '@tanstack/react-table'

import { useMemo, useState, type FC } from 'react'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardFooter,
	CardHeader,
	CardHeading,
	CardTable,
	CardToolbar,
} from '@/shared/components/ui/card'
import { DataGrid } from '@/shared/components/ui/data-grid'
import { DataGridColumnHeader } from '@/shared/components/ui/data-grid-column-header'
import { DataGridPagination } from '@/shared/components/ui/data-grid-pagination'
import { DataGridTable } from '@/shared/components/ui/data-grid-table'
import { Input } from '@/shared/components/ui/input'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { Plus, Search, X } from 'lucide-react'
import { PAGINATION } from '@/shared/constants'
import { cn, PAGES, type CoinGeckoToken, numberFormation } from '@/shared'
import Link from 'next/link'

interface DataGridViewProps {
	dataTokens?: CoinGeckoToken[]
	isLoading: boolean
}

export const DataGridView: FC<DataGridViewProps> = props => {
	const { dataTokens, isLoading } = props

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.DEFAULT_LIMIT,
	})
	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'Рыночная капитализация', desc: true },
	])
	const [searchQuery, setSearchQuery] = useState('')

	const filteredData = useMemo(() => {
		return dataTokens?.filter(item => {
			const searchLower = searchQuery.toLowerCase()
			return (
				!searchQuery ||
				Object.values(item).join(' ').toLowerCase().includes(searchLower)
			)
		})
	}, [searchQuery, isLoading])

	const columns = useMemo<ColumnDef<CoinGeckoToken>[]>(
		() => [
			{
				accessorKey: 'name',
				id: 'name',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Монета'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex items-center gap-3'>
							<Avatar className='size-10'>
								<AvatarImage src={row.original.image} alt={row.original.name} />

								<AvatarFallback>T</AvatarFallback>
							</Avatar>

							<Button mode={'link'} underline={'solid'}>
								<Link href={PAGES.TOKEN_INFO(row.original.id)}>
									{row.original.name}
								</Link>
							</Button>
						</div>
					)
				},
				size: 120,
				enableSorting: true,
				enableResizing: true,
				enableHiding: false,
			},
			{
				accessorKey: 'current_price',
				id: 'current_price',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Текущая цена'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => (
					<Badge
						variant={
							row.original.price_change_percentage_24h >= 0
								? 'success'
								: 'destructive'
						}
						appearance={'light'}
						size={'lg'}
					>
						{numberFormation(row.original.current_price)}
					</Badge>
				),
				size: 120,
				enableSorting: true,
				enableResizing: true,
				enableHiding: false,
			},
			{
				accessorKey: 'low_24h',
				id: 'мин 24ч',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='мин. 24ч'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => {
					return (
						<Badge variant={'secondary'} appearance={'outline'} size={'lg'}>
							{numberFormation(row.original.low_24h)}
						</Badge>
					)
				},
				size: 120,
				enableSorting: true,
				enableResizing: true,
				enableHiding: true,
			},
			{
				accessorKey: 'high_24h',
				id: 'макс 24ч',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='макс. 24ч'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => {
					return (
						<Badge variant={'outline'} size={'lg'}>
							{numberFormation(row.original.high_24h)}
						</Badge>
					)
				},
				size: 120,
				enableSorting: true,
				enableResizing: true,
				enableHiding: true,
			},
			{
				accessorKey: 'price_change_percentage_24h',
				id: 'Изменения за 24ч',
				header: ({ column }) => (
					<DataGridColumnHeader title='24ч' visibility={true} column={column} />
				),
				cell: ({ row }) => {
					return (
						<Badge
							variant={
								row.original.price_change_percentage_24h >= 0
									? 'success'
									: 'destructive'
							}
							appearance={'outline'}
							size={'lg'}
						>
							{numberFormation(row.original.price_change_percentage_24h, '%')}
						</Badge>
					)
				},
				meta: {
					headerClassName: '',
					cellClassName: 'text-start',
				},
				size: 70,
				enableSorting: true,
				enableResizing: true,
				enableHiding: true,
			},
			{
				accessorKey: 'market_cap',
				id: 'Рыночная капитализация',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Рыночная кап.'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => (
					<div
						className={cn('flex items-center', 'font-medium text-foreground')}
					>
						{numberFormation(row.original.market_cap)}
					</div>
				),
				size: 150,
				enableSorting: true,
				enableResizing: true,
				enableHiding: true,
			},
		],
		[]
	)

	const [columnOrder, setColumnOrder] = useState<string[]>(
		columns.map(column => column.id as string)
	)

	const table = useReactTable({
		columns,
		data: filteredData || [],
		pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
		getRowId: (row: CoinGeckoToken) => row.id,
		state: {
			pagination,
			sorting,
			columnOrder,
		},
		columnResizeMode: 'onChange',
		onColumnOrderChange: setColumnOrder,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<DataGrid
			isLoading={isLoading}
			table={table}
			recordCount={filteredData?.length || 0}
			tableLayout={{
				columnsPinnable: true,
				columnsResizable: true,
				columnsMovable: true,
				columnsVisibility: true,
				headerSticky: true,
			}}
		>
			<Card>
				<CardHeader className='py-4'>
					<CardHeading>
						<div className='relative'>
							<Search className='size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2' />

							<Input
								placeholder='Поиск...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='ps-9 w-40'
							/>

							{searchQuery.length > 0 && (
								<Button
									mode='icon'
									variant='ghost'
									className='absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6'
									onClick={() => setSearchQuery('')}
								>
									<X />
								</Button>
							)}
						</div>
					</CardHeading>

					<CardToolbar>
						<Button onClick={() => {}} disabled={true}>
							<Plus />
							Об этой таблице
						</Button>
					</CardToolbar>
				</CardHeader>

				<CardTable>
					<ScrollArea className='max-h-screen'>
						<DataGridTable />

						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				</CardTable>

				<CardFooter>
					<DataGridPagination />
				</CardFooter>
			</Card>
		</DataGrid>
	)
}
