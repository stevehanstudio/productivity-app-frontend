import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constants/constants'
import { ProjectType, TaskType } from '@/types/types'

// interface UseProjects {
//   projects: ProjectType[]
//   id?: string
// }

export function useProjects() {
	const query = useQuery<ProjectType[]>(
		['projects'],
		async () => {
			try {
				const response = await fetch(`${API_URL}/project`)
				return response.json()
			} catch (err) {
				return undefined
			}
		},
		{
			cacheTime: Infinity,
			staleTime: 60_000,
		}
	)
	return query.data
}

export function useProject(id: string) {
	const query = useQuery<ProjectType>(
		['projects', id],
		async () => {
			try {
				const response = await fetch(`${API_URL}/project/${+id}`)
				return response.json()
			} catch (err) {
				return undefined
			}
		},
		{
			cacheTime: Infinity,
			staleTime: 60_000,
		}
	)
	return query.data
}

export function useTasks(projectId: string) {
	const query = useQuery<TaskType[]>(
		['tasks', projectId],
		async () => {
			try {
				const response = await fetch(
					`${API_URL}/project/${projectId}/tasks`
				)
				return response.json()
			} catch (err) {
				return undefined
			}
		},
		{
			cacheTime: Infinity,
			staleTime: 60_000,
		}
	)
	return query.data
}
