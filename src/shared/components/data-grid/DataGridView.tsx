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
import { cn, type CoinGeckoToken } from '@/shared'

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
		{ id: 'market_cap', desc: true },
	])
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

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
				accessorKey: 'id',
				id: 'id',
				header: () => <DataGridTableRowSelectAll />,
				cell: ({ row }) => <DataGridTableRowSelect row={row} />,
				enableSorting: false,
				size: 30,
				meta: {
					headerClassName: '',
					cellClassName: '',
				},
				enableResizing: false,
			},
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

								<AvatarFallback>H</AvatarFallback>
							</Avatar>

							<div className='font-medium text-foreground'>
								{row.original.name}
							</div>
						</div>
					)
				},
				size: 200,
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
					<div className='flex items-center font-medium text-foreground'>
						$ {row.original.current_price}
					</div>
				),
				size: 150,
				enableSorting: true,
				enableResizing: true,
				enableHiding: false,
			},
			{
				accessorKey: 'market_cap',
				id: 'market_cap',
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
				enableHiding: false,
			},
			{
				accessorKey: 'price_change_percentage_24h',
				id: 'price_change_percentage_24h',
				header: ({ column }) => (
					<DataGridColumnHeader title='24ч' visibility={true} column={column} />
				),
				cell: ({ row }) => {
					return (
						<div
							className={cn(
								'flex items-center',
								row.original.price_change_percentage_24h >= 0
									? 'text-green-500'
									: 'text-red-500'
							)}
						>
							{row.original.price_change_percentage_24h}%
						</div>
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
			// {
			// 	accessorKey: 'status',
			// 	id: 'status',
			// 	header: ({ column }) => (
			// 		<DataGridColumnHeader
			// 			title='Status'
			// 			visibility={true}
			// 			column={column}
			// 		/>
			// 	),
			// 	cell: ({ row }) => {
			// 		const status = row.original.status
			// 		switch (status) {
			// 			case 'Active':
			// 				return (
			// 					<Badge variant='primary' appearance='outline'>
			// 						Approved
			// 					</Badge>
			// 				)
			// 			case 'Blocked':
			// 				return (
			// 					<Badge variant='destructive' appearance='outline'>
			// 						Blocked
			// 					</Badge>
			// 				)
			// 			case 'Inactive':
			// 				return (
			// 					<Badge variant='secondary' appearance='outline'>
			// 						Inactive
			// 					</Badge>
			// 				)
			// 			default:
			// 				return (
			// 					<Badge variant='secondary' appearance='outline'>
			// 						Pending
			// 					</Badge>
			// 				)
			// 		}
			// 	},
			// 	size: 100,
			// 	enableSorting: true,
			// 	enableHiding: true,
			// 	enableResizing: true,
			// },
			{
				id: 'actions',
				header: '',
				cell: ({ row }) => <ActionsCell row={row} />,
				size: 60,
				enableSorting: false,
				enableHiding: false,
				enableResizing: false,
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
			}}
		>
			<Card>
				<CardHeader className='py-4'>
					<CardHeading>
						<div className='flex items-center gap-2.5'>
							<div className='relative'>
								<Search className='size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2' />
								<Input
									placeholder='Search...'
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
										Blockchain
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
						<Button>
							<Plus />
							Add new
						</Button>
					</CardToolbar>
				</CardHeader>

				<CardTable>
					<ScrollArea>
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
