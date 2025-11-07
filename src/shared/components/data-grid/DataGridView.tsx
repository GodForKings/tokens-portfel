import type {
	ColumnDef,
	PaginationState,
	Row,
	SortingState,
} from '@tanstack/react-table'

import { useMemo, useState, type FC } from 'react'
import { useCopyToClipboard } from '@/shared/hooks'
import { Alert, AlertIcon, AlertTitle } from '@/shared/components/ui/alert'
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
import { Checkbox } from '@/shared/components/ui/checkbox'
import { DataGrid } from '@/shared/components/ui/data-grid'
import { DataGridColumnHeader } from '@/shared/components/ui/data-grid-column-header'
import { DataGridPagination } from '@/shared/components/ui/data-grid-pagination'
import {
	DataGridTable,
	DataGridTableRowSelect,
	DataGridTableRowSelectAll,
} from '@/shared/components/ui/data-grid-table'
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { RiCheckboxCircleFill } from '@remixicon/react'
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { Ellipsis, Filter, Plus, Search, X } from 'lucide-react'
import { toast } from 'sonner'
import { PAGINATION } from '@/shared/constants'
import { cn, PAGES, type CoinGeckoToken } from '@/shared'
import Link from 'next/link'

function ActionsCell({ row }: { row: Row<CoinGeckoToken> }) {
	const { copy } = useCopyToClipboard()
	const handleCopyId = () => {
		copy(row.original.id)
		const message = `TokenName successfully copied: ${row.original.id}`
		toast.custom(
			t => (
				<Alert
					variant='mono'
					icon='primary'
					close={false}
					onClose={() => toast.dismiss(t)}
				>
					<AlertIcon>
						<RiCheckboxCircleFill />
					</AlertIcon>
					<AlertTitle>{message}</AlertTitle>
				</Alert>
			),
			{
				position: 'top-center',
			}
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='size-7' mode='icon' variant='ghost'>
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side='bottom' align='end'>
				<DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
				<DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant='destructive' onClick={() => {}}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

interface DataGridViewProps {
	dataTokens?: CoinGeckoToken[]
	isLoading: boolean
}

const DataGridView: FC<DataGridViewProps> = props => {
	const { dataTokens, isLoading } = props

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.DEFAULT_LIMIT,
	})
	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'Рыночная капитализация', desc: true },
	])
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]) // category

	const filteredData = useMemo(() => {
		return dataTokens?.filter(item => {
			// Filter by status
			const matchesStatus =
				!selectedStatuses?.length || selectedStatuses.includes(item.name)

			const searchLower = searchQuery.toLowerCase()
			const matchesSearch =
				!searchQuery ||
				Object.values(item).join(' ').toLowerCase().includes(searchLower)

			return matchesStatus && matchesSearch
		})
	}, [searchQuery, selectedStatuses, isLoading])

	// category event
	const handleStatusChange = (checked: boolean, value: string) => {
		setSelectedStatuses(
			(
				prev = [] // Default to an empty array
			) => (checked ? [...prev, value] : prev.filter(v => v !== value))
		)
	}

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
				size: 100,
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
						$ {row.original.current_price}
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
							$ {row.original.low_24h}
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
							$ {row.original.high_24h}
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
							{row.original.price_change_percentage_24h}%
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
					<div className='flex items-center font-medium text-foreground'>
						$ {row.original.market_cap}
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
						<div className='flex items-center gap-2.5'>
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
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='outline'>
										<Filter />
										Фильтр
										{selectedStatuses.length > 0 && (
											<Badge size='sm' appearance='outline'>
												{selectedStatuses.length}
											</Badge>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-40 p-3' align='start'>
									<div className='space-y-3'>
										<div className='text-xs font-medium text-muted-foreground'>
											Filters
										</div>
										{/* <div className='space-y-3'>
											{Object.keys(statusCounts).map(status => (
												<div key={status} className='flex items-center gap-2.5'>
													<Checkbox
														id={status}
														checked={selectedStatuses.includes(status)}
														onCheckedChange={checked =>
															handleStatusChange(checked === true, status)
														}
													/>
													<Label
														htmlFor={status}
														className='grow flex items-center justify-between font-normal gap-1.5'
													>
														{status}
														<span className='text-muted-foreground'>
															{statusCounts[status]}
														</span>
													</Label>
												</div>
											))}
										</div> */}
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</CardHeading>
					<CardToolbar>
						<Button onClick={() => {}} disabled={true}>
							<Plus />
							Add new
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

export default DataGridView
