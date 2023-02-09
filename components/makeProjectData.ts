import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { TaskType, ProjectType } from '@/types/types'

// export type Person = {
// 	firstName: string
// 	lastName: string
// 	age: number
// 	visits: number
// 	progress: number
// 	status: 'relationship' | 'complicated' | 'single'
// 	subRows?: Person[]
// }

const range = (len: number) => {
	const arr = []
	for (let i = 0; i < len; i++) {
		arr.push(i)
	}
	return arr
}

// const newPerson = (): Person => {
// 	return {
// 		firstName: faker.name.firstName(),
// 		lastName: faker.name.lastName(),
// 		age: faker.datatype.number(40),
// 		visits: faker.datatype.number(1000),
// 		progress: faker.datatype.number(100),
// 		status: faker.helpers.shuffle<Person['status']>([
// 			'relationship',
// 			'complicated',
// 			'single',
// 		])[0]!,
// 	}
// }

const newTask = (): TaskType => {
	return {
		taskId: uuid(),
		name: faker.name.firstName(),
		dateDue: faker.date.future(),
		dateCreated: faker.date.past(),
		tags: [faker.name.firstName(), faker.name.lastName()],
		status: faker.helpers.shuffle<TaskType['status']>([
			'To do',
			'In progress',
			'Done',
		])[0]!,
		notes: faker.name.lastName(),
	}
}

// const newProject = (): ProjectType => {
// 	return {
// 		projectId: uuid(),
// 		name: faker.name.firstName(),
// 		tasks
// 	}
// }

export const makeData = ():ProjectType[] => {
	const projects: ProjectType[] = []
	for (let i=0; i < 3; i++) {
		projects.push({
			projectId: uuid(),
			name: faker.name.firstName(),
			tasks: [newTask(), newTask(), newTask()],
		})
	}
	return projects
}

// 	const makeDataLevel = (depth = 0): TaskType[] => {
// 		const len = lens[depth]!
// 		return range(len).map((d): TaskType => {
// 			return {
// 				...newTask(),
// 				// subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
// 			}
// 		})
// 	}

// 	return makeDataLevel()
// }


// export function makeData(...lens: number[]) {
// 	const makeDataLevel = (depth = 0): TaskType[] => {
// 		const len = lens[depth]!
// 		return range(len).map((d): TaskType => {
// 			return {
// 				...newTask(),
// 				// subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
// 			}
// 		})
// 	}

// 	return makeDataLevel()
// }
