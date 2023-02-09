import React from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import DatePicker from "react-datepicker"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { TaskType } from "@/types/types"

type EventType = {
	title: string,
	allDay: boolean,
	start: Date,
	end: Date
}

interface Props {
	tasks: TaskType[]
}

const CalendarView:React.FC<Props> = ({ tasks }) => {
  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })

  // const events = [
	// 	{
	// 		title: 'Big Meeting',
	// 		allDay: true,
	// 		start: new Date(2023, 0, 4),
	// 		end: new Date(2023, 0, 5),
	// 	},
	// 	{
	// 		title: 'Vacation',
	// 		start: new Date(2023, 0, 20),
	// 		end: new Date(2023, 0, 30),
	// 	},
	// 	{
	// 		title: 'Conference',
	// 		start: new Date(2023, 0, 10),
	// 		end: new Date(2023, 0, 10),
	// 	},
  // ]

	const events = tasks.map(task =>
		({
			title: task.name,
			allDay: true,
			start: task.dateDue,
			end: task.dateDue,
		})
	)

  return (
		<div>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500, margin: '50px' }}
			/>
		</div>
  )
}

export default CalendarView