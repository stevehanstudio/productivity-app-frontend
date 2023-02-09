import React from "react"

export type StatusType = 'To do' | 'In progress' | 'Done'

export type TaskType = {
	id: string
	name: string
	dateDue: Date
	dateCreated: Date
	tags: string[]
	status: StatusType
	notes: string
	// subRows?: TaskType[]
}

export type ProjectType = {
	id: string
	name: string
	tasks: TaskType[]
}

export type ViewMenuType = {
	label: ViewMenuLabelType
	icon: React.ReactElement
}

export type ViewMenuLabelType = 'Table' | 'Calendar' | 'Board'