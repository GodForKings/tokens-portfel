'use client'
import { useMemo, useState, type FC } from 'react'

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
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type PaginationState,
	type SortingState,
} from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { numberFormation, cn } from '@/shared'
import { PAGINATION } from '@/shared/constants'
import { Input } from '../ui/input'
import type { IToken } from '@/entities'

interface CustomTokenTableProps {
	dataTokens: IToken[]
	isLoading: boolean
	children: React.ReactNode
}

export const CustomTokenTable: FC<CustomTokenTableProps> = props => {
	const { dataTokens, isLoading, children } = props

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.DEFAULT_LIMIT,
	})
	const [sorting, setSorting] = useState<SortingState>([])
	const [searchQuery, setSearchQuery] = useState('')

	const filteredData = useMemo(() => {
		return dataTokens?.filter(item => {
			const searchLower = searchQuery.toLowerCase()
			return (
				!searchQuery ||
				Object.values(item).join(' ').toLowerCase().includes(searchLower)
			)
		})
	}, [searchQuery, isLoading, dataTokens])

	const columns = useMemo<ColumnDef<IToken>[]>(
		() => [
			{
				accessorKey: 'symbol',
				id: 'symbol',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Криптовалюта'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => {
					return (
						<Badge variant={'secondary'} appearance={'light'}>
							{row.original.symbol}
						</Badge>
					)
				},
				size: 70,
				enableSorting: true,
				enableResizing: true,
				enableHiding: false,
			},
			{
				accessorKey: 'lastPrice',
				id: 'lastPrice',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Актуальная цена'
						visibility={true}
						column={column}
					/>
				),
				cell: ({ row }) => (
					<Badge
						variant={
							Number(row.original.priceChange) >= 0 ? 'success' : 'destructive'
						}
						appearance={'light'}
						size={'lg'}
					>
						{numberFormation(Number(row.original.lastPrice))}
					</Badge>
				),
				size: 120,
				enableSorting: true,
				enableResizing: true,
				enableHiding: false,
			},
			{
				accessorKey: 'priceChangePercent',
				id: 'Изменения за 24ч',
				header: ({ column }) => (
					<DataGridColumnHeader title='24ч' visibility={true} column={column} />
				),
				cell: ({ row }) => {
					return (
						<Badge
							variant={
								Number(row.original.priceChangePercent) >= 0
									? 'success'
									: 'destructive'
							}
							appearance={'outline'}
							size={'lg'}
						>
							{numberFormation(Number(row.original.priceChangePercent), '%')}
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
				accessorKey: 'lowPrice',
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
							{numberFormation(Number(row.original.lowPrice))}
						</Badge>
					)
				},
				size: 120,
				enableSorting: true,
				enableResizing: true,
				enableHiding: true,
			},
			{
				accessorKey: 'highPrice',
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
							{numberFormation(Number(row.original.highPrice))}
						</Badge>
					)
				},
				size: 120,
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
		getRowId: (row: IToken) => row.symbol,
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

					<CardToolbar>{children}</CardToolbar>
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
