'use client'

import { createContext, useState, useEffect, useReducer, Dispatch } from "react"
// import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ProjectType, TaskType, ViewMenuLabelType, ViewMenuType } from '@/types/types'
import { makeData } from "@/components/makeProjectData"
import { API_URL } from '@/constants/constants'
// import { AppContextType } from "next/dist/shared/lib/utils"

type AppContextType = {
// 	// projects: ProjectType[]
// 	// setProjects: Dispatch<SetStateAction<ProjectType[]>>
// 	state: StateType
	activeView: ViewMenuLabelType
	handleSelectActiveView: (newActiveView: ViewMenuLabelType) => void
// 	// addProject: (projectId: string) => void
// 	// deleteProject: (projectId: string) => void
// 	// renameProject: (projectId: string, name: string) => void
// 	// addTask: (taskId: string) => void
// 	// deleteTask: (taskId: string) => void
// 	// updateTask: (taskId: string, task: TaskType) => void
}

enum ActionType {
	INIT_PROJECTS,
	CREATE_PROJECT,
	DELETE_PROJECT,
	RENAME_PROJECT,
	ADD_TASK,
	DELETE_TASK,
	UPDATE_TASK
}

// interface Action {
// 	type: ActionType
// 	payload: {
// 		projectId?: string
// 		name?: string
// 		taskId?: string
// 		task?: TaskType
// 	}
// }

type StateType = {
	projects: ProjectType[]
}

export const initialState: StateType = {
	projects: []
}

export const initProjects = (
	projects: ProjectType[]
): {
	type: 'INIT_PROJECTS'
	payload: {
		projects: ProjectType[]
	}
} => ({
	type: 'INIT_PROJECTS',
	payload: {
		projects
	}
})


export const createProject = (
	projectId: string
): {
	type: 'CREATE_PROJECT'
	payload: {
		projectId: string
	}
} => ({
	type: 'CREATE_PROJECT',
	payload: {
		projectId
	}
})

export const deleteProject = (
	projectId: string
): {
	type: 'DELETE_PROJECT'
	payload: {
		projectId: string
	}
} => ({
	type: 'DELETE_PROJECT',
	payload: { projectId },
})

export const renameProject = (
	projectId: string,
	name: string
): {
	type: 'RENAME_PROJECT'
	payload: {
		projectId: string
		name: string
	},
} => ({
	type: 'RENAME_PROJECT',
	payload: {
		projectId,
		name
	},
})

export const createTask = (
	projectId: string,
	taskId: string
): ({
	type: 'CREATE_TASK';
	payload: {
		projectId: string
		taskId: string
	};
}) => ({
	type: 'CREATE_TASK',
	payload: {
		projectId,
		taskId
	}
})

export const deleteTask = (
	projectId: string,
	taskId: string
): ({
	type: 'DELETE_TASK'
	payload: {
		projectId: string,
		taskId: string
	}
}) => ({
	type: 'DELETE_TASK',
	payload: {
		projectId,
		taskId
	},
})

export const updateTask = (
	projectId: string,
	taskId: string,
	task: TaskType
): {
	type: 'UPDATE_TASK'
	payload: {
		projectId: string
		taskId: string
		task: TaskType
	}
} => ({
	type: 'UPDATE_TASK',
	payload: {
		projectId,
		taskId,
		task,
	},
})

// export type Action =
// 	| ReturnType<typeof initProjects>
// 	| ReturnType<typeof createProject>
// 	| ReturnType<typeof deleteProject>
// 	| ReturnType<typeof renameProject>
// 	| ReturnType<typeof createTask>
// 	| ReturnType<typeof deleteTask>
// 	| ReturnType<typeof updateTask>

// const reducer: Reducer<AppState, Action> = (state=initialState, action) => {
// const reducer = (state: StateType, action: Action): StateType => {
// 	const { type, payload } = action
// 	switch (type) {
		// case 'INIT_PROJECTS':
		// 	return {
		// 		...state,
		// 		projects: payload.projects
		// 	}

		// case 'CREATE_PROJECT':
		// 	const projectId = action
		// 	return {
		// 		...state,
		// 		projects: [
		// 			...state.projects,
		// 			{
		// 				projectId: payload.projectId,
		// 				name: '',
		// 				tasks: [],
		// 			},
		// 		],
		// 	}
		// case 'DELETE_PROJECT':
		// 	return {
		// 		...state,
		// 		projects: state.projects.filter(
		// 			project => project.projectId !== payload.projectId
		// 		),
		// 	}
		// case 'RENAME_PROJECT':
		// 	return state
		// 	// return {
		// 	// 	...state,
		// 	// 	projects: state.projects.map(project => {
		// 	// 		if (project.projectId === payload.projectId) {
		// 	// 			return {
		// 	// 				...project,
		// 	// 				name: payload.name,
		// 	// 			}
		// 	// 		}
		// 	// 	}),
		// 	// }
		// case 'CREATE_TASK':
		// 	return state
		// 	// return {
		// 	// 	...state,
		// 	// 	projects: state.projects.map(project => {
		// 	// 		if (project.projectId === payload.projectId) {
		// 	// 			return {
		// 	// 				...project,
		// 	// 				tasks: [
		// 	// 					...project.tasks,
		// 	// 					{
		// 	// 						taskId: payload.taskId,
		// 	// 					},
		// 	// 				],
		// 	// 			}
		// 	// 		} else {
		// 	// 			return project
		// 	// 		}
		// 	// 	}),
		// 	// }
		// case 'DELETE_TASK':
		// 	return {
		// 		...state,
		// 		projects: state.projects.filter(project => {
		// 			if (project.projectId !== payload.projectId) {
		// 				return project.tasks.filter(
		// 					task => task.taskId !== payload.taskId
		// 				)
		// 			} else {
		// 				return project
		// 			}
		// 		}),
		// 	}
		// case 'UPDATE_TASK':
		// 	return state
		// 	// return {
		// 	// 	...state,
		// 	// 	projects: state.projects.map(project => {
		// 	// 		if (project.projectId !== payload.projectId) {
		// 	// 			return {
		// 	// 				...project,
		// 	// 				tasks: project.tasks.map(task => {
		// 	// 					if (task.taskId === payload.taskId) return payload.task
		// 	// 					else return task
		// 	// 				}),
		// 	// 			}
		// 	// 		}
		// 	// 	}),
		// 	// }
// 		default:
// 			return state
// 	}
// }

// export const useAppContext = (initialState: StateType) => {
// 	const [state, dispatch] = useReducer(reducer, initialState)

	// const createProject = (projectId: string) =>
	// 	dispatch({
	// 		type: ActionType.CREATE_PROJECT,
	// 		payload: {projectId}
	// 	})

	// const deleteProject = (projectId: string) =>
	// 	dispatch({
	// 		type: ActionType.DELETE_PROJECT,
	// 		payload: { projectId },
	// 	})

	// const renameProject = (projectId: string, name: string) =>
	// 	dispatch({
	// 		type: ActionType.RENAME_PROJECT,
	// 		payload: { projectId, name },
	// 	})

	// const addTask = (taskId: string) =>
	// 	dispatch({
	// 		type: ActionType.ADD_TASK,
	// 		payload: { taskId },
	// 	})

	// const deleteTask = (taskId: string) =>
	// 	dispatch({
	// 		type: ActionType.DELETE_TASK,
	// 		payload: { taskId },
	// 	})

	// const updateTask = (taskId: string, task: TaskType) =>
	// 	dispatch({
	// 		type: ActionType.DELETE_TASK,
	// 		payload: { taskId, task },
	// 	})

	// return {
	// 	state,
	// 	// addProject,
		// deleteProject,
		// renameProject,
		// addTask,
		// deleteTask,
		// updateTask
// 	}
// }

// type UseAppContextType = ReturnType<typeof useAppContext>
	// useContext(AppContext)

// const initialContextState: UseAppContextType = {
// 	state: initialState,
// 	addProject: (projectId: string) => {},
// 	deleteProject: (projectId: string) => {},
// 	renameProject: (projectId: string, name: string) => {},
// 	addTask: (taskId: string) => {},
// 	deleteTask: (taskId: string) => {},
// 	updateTask: (taskId: string, task: TaskType) => {}
// }


// export const AppContext = createContext<{
// 	activeView: ViewMenuType
// 	handleSetActiveView:
	// state: StateType
	// dispatch: Dispatch<any>
// }>({
	// state: initialState,
	// dispatch: () => null
// })

export const AppContext = createContext<AppContextType>({} as AppContextType)

// const appReducer = ({ projects }: any, action: ActionType) => ({
// 	projects: reducer(projects, action)
// })

// const API_URL = 'http://localhost:8080/api/v1'

// const fetchAllProjects = async () => {
// 	const response = await fetch(`${API_URL}/project/all`)
// 	return response.json()
// }

// const useFetchAllTasks = async () => {
// 	// const queryClient = useQueryClient()


// 	const { data, isLoading } = useQuery(
// 		['tasks'],
// 		() => {

// 		}
// 	)

// 	const response = await fetch(`${API_URL}/task/all`)
// 	return response.json()
// }

interface Props {
	children: JSX.Element
}

export const AppProvider: React.FC<Props> = ({ children }) => {
	// const [projects, setProjects] = useState<ProjectType[] | []>([])
	const [activeView, setActiveView] = useState<ViewMenuLabelType>('Table')
	// const [state, dispatch] = useReducer(reducer, initialState)
	// const queryClient = useQueryClient()

	// useEffect(() => {
	// 	const projects = makeData()
	// 	console.log('makeData', projects)
	// 	dispatch({ type: 'INIT_PROJECTS', payload: { projects } })
	// }, [])

	// useEffect(() => {
	// 	queryClient.prefetchQuery(['projects'], fetchAllProjects)
		// queryClient.prefetchQuery(['tasks'], fetchAllTasks)
		// const projectsFromSource = await fetchAllProjects()
		// console.log('queryClient', queryClient)
	// }, [queryClient])

	// const { data, isLoading } = useQuery(["projects"], fetchAllProjects)
	// console.log('project data', isLoading, data);

	// const { data: tasksData, isLoading: tasksDataIsLoading } = useQuery(['tasks'], fetchAllTasks)

	const handleSelectActiveView = (newActiveView: ViewMenuLabelType) => {
		setActiveView(newActiveView)
	}

	return (
			<AppContext.Provider
				value={{ activeView, handleSelectActiveView }}
				// value={{ activeView, handleSelectActiveView, state, dispatch }}
				// value={{ state, dispatch }}
			>
				{children}
			</AppContext.Provider>
	)
}
