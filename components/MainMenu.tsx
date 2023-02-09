'use client'
import { useContext } from 'react'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelectedLayoutSegment } from 'next/navigation'
import { IoSearch } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { AiOutlineDashboard } from 'react-icons/ai'
import { GrProjects } from 'react-icons/gr'
import { AppContext } from '@/context/AppContext'
import { ProjectType } from '../types/types'
import { API_URL } from '@/constants/constants'

async function getProjects(): Promise<ProjectType[]> {
	const response = await fetch(`${API_URL}/project/all`)
	return response.json()
}

const mainMenu = [
	{
		label: 'Search',
		path: '/search',
		icon: <IoSearch size={20} className='pr-1' />,
		targetSegment: 'search',
	},
	{
		label: 'Settings',
		path: '/settings',
		icon: <IoMdSettings size={20} className='pr-1' />,
		targetSegment: 'settings',
	},
	{
		label: 'Dashboard',
		path: '/dashboard',
		icon: (
			<AiOutlineDashboard size={20} className='pr-1' />
		),
		targetSegment: 'dashboard',
	},
	{
		label: 'Projects',
		path: '/projects',
		icon: <GrProjects size={23} className='pl-1 pr-2 -top-[2px]' />,
		targetSegment: 'projects',
	},
]

const MainMenu = () => {
	const activeSegment = useSelectedLayoutSegment()
	const { state } = useContext(AppContext)
	console.log('MainMenu', state)
	// const projects = state.projects

	const { data: projectsData = [] } = useQuery(['projects'], getProjects)
	console.log('projects data!', projectsData)

	return (
		<nav className='flex flex-col h-full border-r-2'>
			{mainMenu.map((item, i) => (
				<div key={i}>
					<Link
						className='flex flex-row px-3 py-1 m-3 text-sm font-semibold text-gray-400 rounded-sm hover:bg-gray-100'
						style={{
							textDecoration:
								activeSegment === item.targetSegment
									? 'underline'
									: 'none',
						}}
						// key={i}
						href={item.path}
					>
						{item.icon}
						{item.label}
					</Link>
					{/* {item.label === 'Projects' &&
						projects &&
						projects.map(project => (
							<div key={project.projectId}>
								<Link
									href={`/projects/${project.projectId}`}
									className='px-2 m-10 text-sm font-semibold text-gray-400'
								>
									{project.name}
								</Link>
							</div>
						))} */}
					{item.label === 'Projects' &&
						projectsData &&
						projectsData.map((projectData: ProjectType) => (
							<div key={projectData.id}>
								<Link
									href={`/projects/${projectData.id}`}
									className='px-2 m-10 text-sm font-semibold text-gray-400'
								>
									{projectData.name}
								</Link>
							</div>
						))}
				</div>
			))}
		</nav>
	)
}

export default MainMenu
