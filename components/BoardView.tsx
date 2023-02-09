import { ColumnSizing } from '@tanstack/react-table'
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { v4 as uuid } from 'uuid'
import { AiOutlinePlus } from 'react-icons/ai'
import { TaskType } from '@/types/types'

const itemsFromBackend = [
	{ id: uuid(), content: 'First task' },
	{ id: uuid(), content: 'Second task' },
	{ id: uuid(), content: 'Third task' },
	{ id: uuid(), content: 'Fourth task' },
	{ id: uuid(), content: 'Fifth task' },
]

// const columnsFromBackend = {
// 	[uuid()]: {
// 		name: 'To do',
// 		items: itemsFromBackend,
// 	},
// 	[uuid()]: {
// 		name: 'In Progress',
// 		items: [],
// 	},
// 	[uuid()]: {
// 		name: 'Done',
// 		items: [],
// 	},
// }

const onDragEnd = (result:any, columns:any, setColumns:any) => {
	if (!result.destination) return
	const { source, destination } = result

	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId]
		const destColumn = columns[destination.droppableId]
		const sourceItems = [...sourceColumn.items]
		const destItems = [...destColumn.items]
		const [removed] = sourceItems.splice(source.index, 1)
		destItems.splice(destination.index, 0, removed)
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		})
	} else {
		const column = columns[source.droppableId]
		const copiedItems = [...column.items]
		const [removed] = copiedItems.splice(source.index, 1)
		copiedItems.splice(destination.index, 0, removed)
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		})
	}
}

interface Props {
	tasks: TaskType[]
}

interface IItem {
	id: string
	content: string
}

interface IColumns {
	[key: string]: {
		name: string
		items: IItem[]
	}
}

const BoardView: React.FC<Props> = ({ tasks }) => {
  // const [columns, setColumns] = useState(columnsFromBackend)
  const [columns, setColumns] = useState<IColumns>({})

	// console.log('tasks', tasks)

	useEffect(() => {
		const toDoItems = tasks
			.filter(task => (task.status === 'To do'))
			.map(task => ({ id: uuid(), content: task.name }))

		const inProgressItems = tasks
			.filter(task => task.status === 'In progress')
			.map(task => ({ id: uuid(), content: task.name }))

		const doneItems = tasks
			.filter(task => task.status === 'Done')
			.map(task => ({ id: uuid(), content: task.name }))

		setColumns({
			[uuid()]: {
				name: 'To do',
				items: toDoItems,
			},
			[uuid()]: {
				name: 'In Progress',
				items: inProgressItems,
			},
			[uuid()]: {
				name: 'Done',
				items: doneItems,
			},
		})
	}, [tasks])

	return (
		<div
			style={{ display: 'flex', height: '100%' }}
			// style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
		>
			<DragDropContext
				onDragEnd={result => onDragEnd(result, columns, setColumns)}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								// margin: '0 5rem',
								// padding: '0 5rem'
								// alignItems: 'center',
							}}
							key={columnId}
						>
							<div className='flex flex-row justify-center align-center w-[120px] px-2 py-1 mx-4 mt-2 text-sm font-semibold bg-gray-200 rounded-xl'>
								<span className='relative top-[5px] bg-blue-400 rounded-full h-[10px] w-[10px]'></span>
								<span className='pl-2'>{column.name}</span>
							</div>
							<div style={{ margin: 8 }}>
								<Droppable droppableId={columnId} key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													// 	background: snapshot.isDraggingOver
													// 		? 'lightblue'
													// 		: 'lightgrey',
													padding: 3,
													width: 250,
													minHeight: 500,
												}}
											>
												{column.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		className='text-sm font-semibold text-gray-700 border-[1px] border-gray-200 rounded-md'
																		style={{
																			userSelect: 'none',
																			padding: 16,
																			margin: '0 0 8px 0',
																			minHeight: '80px',
																			boxShadow:
																				'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
																			backgroundColor:
																				snapshot.isDragging
																					? '#eee'
																					: // ? '#263B4A'
																					  '',
																			// : '#456C86',
																			// color: 'white',
																			...provided
																				.draggableProps
																				.style,
																		}}
																	>
																		{item.content}
																	</div>
																)
															}}
														</Draggable>
													)
												})}
												{provided.placeholder}
												<div className='flex flex-row px-2 py-[5px] text-sm text-gray-400 rounded-md hover:bg-gray-100'>
													<AiOutlinePlus size={19} className='pr-1' />
													<span>New</span>
												</div>
											</div>
										)
									}}
								</Droppable>
							</div>
						</div>
					)
				})}
			</DragDropContext>
		</div>
  )
}

export default BoardView