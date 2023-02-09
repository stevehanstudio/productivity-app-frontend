'use client'
import React, { useState, useContext } from 'react'
import ViewMenu from '../../components/ViewMenu'
import ProjectTable from '@/components/ProjectTable'
import CalendarView from '@/components/CalendarView'
import BoardView from '@/components/BoardView'
// import { TaskType, StatusType } from '@/types/types'
import { AppContext } from '@/context/AppContext'

const Dashboard = () => {
	// const [cellInFocus, setCellInFocus] = useState<CellType | null>(null)
  // const [tasks, setTasks] = useState<TaskType[] | []>(mockTasks)

	const { activeView } = useContext(AppContext)
  // return (
	// 	<div className='flex flex-col'>
	// 		<ViewMenu />
	// 		<ProjectTable />
	// 	</div>

  return (
		<div className='flex flex-col items-stretch mx-auto'>
			<ViewMenu />
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

export default Dashboard