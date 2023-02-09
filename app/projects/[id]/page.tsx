'use client'

// import Image from 'next/image'
import React, { useContext } from "react"
import { withRouter } from 'next/router'
import { Inter } from '@next/font/google'
import { useQuery } from '@tanstack/react-query'
import styles from './page.module.css'
// import MainMenu from '@/components/MainMenu'
import ViewMenu from '@/components/ViewMenu'
import { API_URL } from '@/constants/constants'
import { ProjectType, TaskType } from '@/types/types'
import ProjectGrid from '@/components/ProjectGrid'
import { useProject, useTasks } from '@/hooks/project'
import { AppContext } from '@/context/AppContext'
import { Calendar } from "react-big-calendar"
import BoardView from "@/components/BoardView"
import CalendarView from "@/components/CalendarView"

// const inter = Inter({ subsets: ['latin'] })

// interface Props {
// 	id: number
// }

// const getTask = async (id: string) => {
// 	const response = await fetch(`${API_URL}/project/${id}/tasks`)
// 	return response.json()
// }

export default function Page({params}: {params: { id: string }}) {

	const {id} = params
	// const { id } = withRouter.query()
	console.log('searchParams', params)

	// const { data: projectsData = []}: {data: ProjectType | []} = useQuery(['projects'], () => {})
	// const projectName = projectsData && projectsData!.filter((projectData) => {
	// 	if (projectData && projectData.id === id)
	// 		return projectData
	// })

	// const { data: tasks = [], isLoading }: {data: TaskType[] | undefined, isLoading: boolean} = useQuery(['tasks'], () => getTask(id))

	const project = useProject(id)
	const tasks = useTasks(id)

	const { activeView } = useContext(AppContext)

	return (
		<main>
			<ViewMenu name={project?.name} />
			{tasks && (
				<div>
					{(() => {
						switch (activeView) {
							case 'Table':
								return <ProjectGrid tasks={tasks} />
							case 'Calendar':
								return <CalendarView tasks={tasks}/>
							case 'Board':
								return <BoardView tasks={tasks}/>
						}
					})()}
				</div>
			)}
		</main>
	)
}

// tasks.map(task => (
					// 	<div key={task.taskId}>
							/* <p>Project id: {id}</p>
							<p>Name: {task.name}</p>
							<p>Status: {task.status}</p>
							<p>Tags: {task.tags}</p>
							<p>Date Due: {task.dateDue}</p> */
						// </div>
					// ))}
