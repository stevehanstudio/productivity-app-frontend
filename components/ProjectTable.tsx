'user client'
import {
	useState,
	useEffect,
	useContext,
	// useReducer,
	useCallback,
	useMemo,
	useRef,
	ChangeEvent,
} from 'react'

import {
	Column,
	Table,
	ColumnDef,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
	RowData,
} from '@tanstack/react-table'

import ReactDatePicker from 'react-datepicker'
import DatePicker from './DatePicker'
// import 'react-datepicker/dist/react-datepicker.css'
import '@/styling/datepicker.scss'

import { RxLetterCaseCapitalize } from 'react-icons/rx'
import { HiListBullet } from 'react-icons/hi2'
import { MdAccessTime } from 'react-icons/md'
import { BsCalendar3 } from 'react-icons/bs'
import { RiLoader2Fill } from 'react-icons/ri'

import { makeData } from './makeProjectData'
import { ProjectType, TaskType } from '@/types/types'
import { AppContext } from '@/context/AppContext'

// import './index.css'

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void
	}
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<TaskType>> = {
	cell: function Cell ({ getValue, row: { index }, column: { id }, table }) {
		const initialValue = getValue()
		// We need to keep and update the state of the cell normally
		const [value, setValue] = useState(initialValue)

		// When the input is blurred, we'll call our table meta's updateData function
		const onBlur = () => {
			table.options.meta?.updateData(index, id, value)
		}

		// If the initialValue is changed external, sync it up with our state
		useEffect(() => {
			setValue(initialValue)
		}, [initialValue])

		return (
			<input
				value={value as string}
				onChange={e => setValue(e.target.value)}
				onBlur={onBlur}
			/>
		)
	},
}

function useSkipper() {
	const shouldSkipRef = useRef(true)
	const shouldSkip = shouldSkipRef.current

	// Wrap a function with this to skip a pagination reset temporarily
	const skip = useCallback(() => {
		shouldSkipRef.current = false
	}, [])

	useEffect(() => {
		shouldSkipRef.current = true
	})

	return [shouldSkip, skip] as const
}

const ProjectTable = () =>{
	// const rerender = useReducer(() => ({}), {})[1]

	const [startDate, setStartDate] = useState(new Date())

	const columns = useMemo<ColumnDef<TaskType>[]>(
		() => [
			{
				accessorKey: 'name',
				header: () => (
					<div className='flex flex-row'>
						<span className='relative pr-1 text-center top-[1px]'>
							<RxLetterCaseCapitalize size={17} />
						</span>
						<span className='text-center'>Name</span>
					</div>
				),
				footer: props => props.column.id,
			},
			{
				accessorFn: row => row.dateDue,
				id: 'dateDue',
				header: () => (
					<div className='flex flex-row'>
						<span className='relative pr-1 top-1'>
							<BsCalendar3 size={13} />
						</span>
						<span className='text-center'>Due Date</span>
					</div>
				),
				footer: props => props.column.id,
			},
			{
				accessorFn: row => row.dateCreated,
				id: 'dateCreated',
				header: () => (
					<div className='flex flex-row'>
						<span className='relative pr-1 top-[1px]'>
							<MdAccessTime size={17} />
						</span>
						<span>Created time</span>
					</div>
				),
				footer: props => props.column.id,
			},
			{
				accessorKey: 'Tags',
				header: () => (
					<div className='flex flex-row'>
						<span className='relative pr-1 top-[1px]'>
							<HiListBullet size={18} />
						</span>
						<span className='justify-center text-center'>Tags</span>
					</div>
				),
				footer: props => props.column.id,
			},
			{
				accessorKey: 'status',
				header: () => (
					<div className='flex flex-row'>
						<span className='relative pr-1 top-[1px]'>
							<RiLoader2Fill size={18} />
						</span>
						<span>Status</span>
					</div>
				),
				footer: props => props.column.id,
			},
			{
				accessorKey: 'notes',
				header: 'Notes',
				footer: props => props.column.id,
			},

			// {
			// 	header: 'Name',
			// 	footer: props => props.column.id,
			// 	columns: [
			// 		{
			// 			accessorKey: 'name',
			// 			header: () => <span>Task Name</span>,
			// 			footer: props => props.column.id,
			// 		},
			// 		{
			// 			accessorFn: row => row.dateDue,
			// 			id: 'dateDue',
			// 			header: () => <span>Due Date</span>,
			// 			footer: props => props.column.id,
			// 		},
			// 	],
			// },
			// {
			// 	header: 'Info',
			// 	footer: props => props.column.id,
			// 	columns: [
			// 		// {
			// 		// 	accessorKey: 'dateCreated',
			// 		// 	header: () => 'Date Created',
			// 		// 	footer: props => props.column.id,
			// 		// },
			// 		{
			// 			header: 'More Info',
			// 			columns: [
			// 				{
			// 					accessorKey: 'Tags',
			// 					header: () => <span>Tags</span>,
			// 					footer: props => props.column.id,
			// 				},
			// 				{
			// 					accessorKey: 'status',
			// 					header: 'Status',
			// 					footer: props => props.column.id,
			// 				},
			// 				{
			// 					accessorKey: 'note',
			// 					header: 'Notes',
			// 					footer: props => props.column.id,
			// 				},
			// 			],
			// 		},
			// 	],
			// },
		],
		[]
	)

	// const [data, setData] = useState(() => makeData(100))
	const { state } = useContext(AppContext)
	// const refreshData = () => setData(() => makeData(100))

	const projectId = state.projects[0].id
	const data:TaskType[] = state.projects[0].tasks

	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

	const table = useReactTable({
		data,
		columns,
		defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		autoResetPageIndex,
		// Provide our updateData function to our table meta
		meta: {
			updateData: (rowIndex, columnId, value) => {
				// Skip age index reset until after next rerender
				skipAutoResetPageIndex()
				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex]!,
								[columnId]: value,
							}
						}
						return row
					})
				)
			},
		},
		debugTable: true,
	})

	return (
		<div className='p-2'>
			<div className='h-2' />
			<table className='text-sm'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr
							key={headerGroup.id}
							className='text-gray-400 border-b-[1px] border-t-[1px]'
						>
							{headerGroup.headers.map(header => {
								return (
									<th
										key={header.id}
										className='p-2 font-normal text-left border-r-[1px] '
										colSpan={header.colSpan}
									>
										{header.isPlaceholder ? null : (
											<div>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{/* {header.column.getCanFilter() ? (
													<div>
														<Filter
															column={header.column}
															table={table}
														/>
													</div>
												) : null} */}
											</div>
										)}
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => {
						return (
							<tr key={row.id} className='border-b-[1px]'>
								{row.getVisibleCells().map((cell, i) => {
									return (
										<td
											key={cell.id}
											className='relative p-2 border-r-[1px]'
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
											{/* {i === 1 && (
												<div className='absolute z-10 right-1 top-10'>
													<DatePicker
														selected={startDate}
														onSelect={(date: Date) =>
															setStartDate(date)
														}
														onChange={(date: Date) =>
															console.log("Don't set yet", date)
														}
														calendarClassName='rasta-stripes'
														minDate={new Date()}
														// onChange={(date: Date) =>
														// 	setStartDate(date)
														// }
													/>
												</div>
											)} */}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className='px-2 py-3 border-b-[1px] text-sm'>
				<button>+ New</button>
			</div>
			{/* <div className='h-2' />
			<div className='flex items-center gap-2'>
				<button
					className='p-1 border rounded'
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{'<<'}
				</button>
				<button
					className='p-1 border rounded'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{'<'}
				</button>
				<button
					className='p-1 border rounded'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{'>'}
				</button>
				<button
					className='p-1 border rounded'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{'>>'}
				</button>
				<span className='flex items-center gap-1'>
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
					</strong>
				</span>
				<span className='flex items-center gap-1'>
					| Go to page:
					<input
						type='number'
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={e => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0
							table.setPageIndex(page)
						}}
						className='w-16 p-1 border rounded'
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => {
						table.setPageSize(Number(e.target.value))
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>{table.getRowModel().rows.length} Rows</div>*/}
			{/* <div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<div>
				<button onClick={() => refreshData()}>Refresh Data</button>
			</div> */}

			<div className='w-full mx-auto'>
				<ReactDatePicker
					selected={startDate}
					onSelect={(date: Date) => setStartDate(date)}
					onChange={(date: Date) => console.log("Don't set yet", date)}
					calendarClassName='rasta-stripes'
					minDate={new Date()}
					// onChange={(date: Date) =>
					// 	setStartDate(date)
					// }
				/>
				<DatePicker />
			</div>
		</div>
	)
}
const Filter = () => <></>

// function Filter({
// 	column,
// 	table,
// }: {
// 	column: Column<any, any>
// 	table: Table<any>
// }) {
// 	const firstValue = table
// 		.getPreFilteredRowModel()
// 		.flatRows[0]?.getValue(column.id)

// 	const columnFilterValue = column.getFilterValue()

// 	return typeof firstValue === 'number' ? (
// 		<div className='flex space-x-2'>
// 			<input
// 				type='number'
// 				value={(columnFilterValue as [number, number])?.[0] ?? ''}
// 				onChange={e =>
// 					column.setFilterValue((old: [number, number]) => [
// 						e.target.value,
// 						old?.[1],
// 					])
// 				}
// 				placeholder={`Min`}
// 				className='w-24 border rounded shadow'
// 			/>
// 			<input
// 				type='number'
// 				value={(columnFilterValue as [number, number])?.[1] ?? ''}
// 				onChange={e =>
// 					column.setFilterValue((old: [number, number]) => [
// 						old?.[0],
// 						e.target.value,
// 					])
// 				}
// 				placeholder={`Max`}
// 				className='w-24 border rounded shadow'
// 			/>
// 		// </div>
// 	// ) : (
// 		<input
// 			type='text'
// 			value={(columnFilterValue ?? '') as string}
// 			onChange={e => column.setFilterValue(e.target.value)}
// 			placeholder={`Search...`}
// 			className='border rounded shadow w-36'
// 		/>
// 	)
// }

export default ProjectTable
