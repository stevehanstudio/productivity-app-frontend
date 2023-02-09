'use client'
import React, { useContext, useEffect, useState } from 'react'
import ViewMenu from '@/components/ViewMenu'
import { TaskType, StatusType } from '@/types/types'
import { AppContext } from '@/context/AppContext'
import ProjectTable from '@/components/ProjectTable'
import CalendarView from '@/components/CalendarView'
import BoardView from '@/components/BoardView'

type CellType = {
  taskId: number,
  cellId: number
}

const projectHeading = [
  'Task Name',
  'Date Due',
  'Date Created',
  'Tags',
  'Status',
  'Notes'
]

// const mockTasks: TaskType[] = [
// 	{
// 		name: 'Play basketball',
// 		dateDue: '10-10-80',
// 		dateCreated: '1-10-90',
// 		tags: [],
// 		status: 'To do',
// 		notes: '',
// 	},
// ]

const Projects = (projectId: string, name: string) => {
  const [cellInFocus, setCellInFocus] = useState<CellType | null>(null)
  // const [tasks, setTasks] = useState<TaskType[] | []>(mockTasks)
	const [activeView, setActiveView] = useState('Table')

	// const { activeView } = useContext(AppContext)

  return (
		<div className='flex flex-col items-stretch mx-auto'>
			<ViewMenu name={name} />
			{(() => {
				switch (activeView) {
					case 'Table':
						return <ProjectTable />
					case 'Calendar':
						return <CalendarView />
					case 'Board':
						return <BoardView />
					default:
						return null
				}
			})()}
		</div>
  )
}

export default Projects

      //   {
      //     (cellInFocus && cellInFocus.taskId === i && cellInFocus.cellId === i) ? (
      //       <td className='p-3' onClick={() => setCellInFocus({taskId: i, cellId: i})} key={i}>
      //         {task.name}
      //       </td>
      //     ) : (
      //       <input />
      //     )
      //   }
      // ))


						{/* <table className='border border-separate border-gray-500 table-auto'>
				<thead>
					<tr className='border border-b-2 border-separate border-green-300'>
						{projectHeading.map((heading, i) => (
							<th className='p-3' key={i}>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tasks.map((task, i) => (
						<tr
							key={i}
							className='border border-b-2 border-separate border-green-300'
						>
							<td className='relative p-3'>
								{task.name}
								<input className='absolute' />
							</td>
							<td className='relative p-3'>
								{task.dateDue}
								<input className='absolute' />
							</td>
							<td className='relative p-3'>
								{task.dateCreated}
								<input className='absolute' />
							</td>
							<td className='relative p-3'>
								{task.tags[0]}
								<input className='absolute' />
							</td>
							<td className='relative p-3'>
								{task.status}
								<input className='absolute' />
							</td>
							<td className='relative p-3'>
								{task.notes}
								<input className='p-3' />
							</td>
						</tr>
					))}
				</tbody>
			</table> */}
