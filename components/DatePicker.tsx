// import './styles.css'
import styled, { css } from 'styled-components'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

const allDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const allMonths = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

// const minDate = new Date(new Date(2022, 5, 22).setHours(0, 0, 0, 0));
// const maxDate = new Date(new Date(2022, 10, 29).setHours(0, 0, 0, 0));
// const openToDate = new Date(new Date(2022, 10, 29).setHours(0, 0, 0, 0));

const minDate: Date | null | undefined = null
const maxDate: Date | null | undefined = null
const openToDate: Date | null | undefined = null

const isInline = true

export default function DatePicker() {
	const currentActiveDay = useRef()
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const [selectedDate, setSelectedDate] = useState<Date | null>()
	const [isPickerOpen, setIsPickerOpen] = useState(false)

	const daysInMonth = (_month:number, _year:number) => {
		const month = _month + 1
		const days = new Date(_year, month, 0).getDate()
		return _.range(1, days + 1)
	}

	const getSortedDays = (_month:number, _year:number) => {
		const dayIndex = new Date(_year, _month, 1).getDay()
		const firstHalf = allDays.slice(dayIndex)
		return [...firstHalf, ...allDays.slice(0, dayIndex)]
	}

	const handleSelect = (e) => {
		if (e.target.id! === 'day') {
			// if (currentActiveDay.current)
			//   currentActiveDay.current.classList.remove("active");
			// currentActiveDay.current = e.target;

			setSelectedDate(
				new Date(
					currentYear,
					currentMonth,
					e.target.getAttribute('data-day')
				)
			)

			if (!isInline) setIsPickerOpen(false)
		}
	}

	const nextMonth = () => {
		if (currentMonth < 11) {
			setCurrentMonth(prev => prev + 1)
		} else {
			setCurrentMonth(0)
			setCurrentYear(prev => prev + 1)
		}
	}

	const prevMonth = () => {
		if (currentMonth > 0) {
			setCurrentMonth(prev => prev - 1)
		} else {
			setCurrentMonth(11)
			setCurrentYear(prev => prev - 1)
		}
	}

	const handleKeyPress = e => {
		if (e.code === 'ArrowRight') nextMonth()
		if (e.code === 'ArrowLeft') prevMonth()
	}

	useEffect(() => {
		if (openToDate && _.isDate(openToDate)) {
			setCurrentMonth(openToDate.getMonth())
			setCurrentYear(openToDate.getFullYear())
		}
	}, [openToDate])

	return (
		<div className='shadow-lg'>
			<Container>
				{!isInline && (
					<input
						onClick={() => setIsPickerOpen(true)}
						value={selectedDate?.toString()}
						type='text'
					/>
				)}

				{(isPickerOpen || isInline) && (
					<PickerWrapper
						className='p-4 shadow-lg'
						onKeyDown={handleKeyPress}
					>
						<input
							className='w-[95%] text-[0.9rem] caret-gray-600 leading-none outline-none px-[8px] py-[4px] m-1 bg-gray-100 border-2 border-gray-200 rounded-[3px]'
							// placeholder='1/1/2006'
							value={selectedDate && format(selectedDate, 'PP')}
							type='text'
						/>
						<PickerHeader>
							<Para>
								{allMonths[currentMonth]} {currentYear}
							</Para>
							<button
								className='p-1 rounded-[5px] hover:bg-gray-100'
								onClick={prevMonth}
							>
								<HiOutlineChevronLeft />
							</button>
							<button
								className='p-1 rounded-[5px] hover:bg-gray-100'
								onClick={prevMonth}
							>
								<HiOutlineChevronRight onClick={nextMonth} />
							</button>

							{/* <button
								onClick={prevMonth}
								disabled={
									minDate?.getTime() >
									new Date(currentYear, currentMonth, 1).getTime()
								}
							>
								<ion-icon name='chevron-back-outline'></ion-icon>
							</button>
							<button
								onClick={nextMonth}
								disabled={
									maxDate?.getTime() <
									new Date(
										currentYear,
										currentMonth,
										new Date(currentYear, currentMonth, 0).getDate()
									).getTime()
								}
							>
								<ion-icon name='chevron-forward-outline'></ion-icon>
							</button> */}
						</PickerHeader>

						{/* <hr /> */}

						<PickerBody>
							<Picker7ColGrid heading>
								{getSortedDays(currentMonth, currentYear).map(d => (
									<p key={d}>{d}</p>
								))}
							</Picker7ColGrid>
							<Picker7ColGrid>
								{/* <Picker7ColGrid onClick={handleSelect}> */}
								{daysInMonth(currentMonth, currentYear).map(d => (
									<button
										disabled={
											minDate?.getTime() >
												new Date(
													currentYear,
													currentMonth,
													d
												).getTime() ||
											maxDate?.getTime() <
												new Date(
													currentYear,
													currentMonth,
													d
												).getTime()
										}
										onClick={handleSelect}
										id='day'
										key={d}
										data-day={d}
										className={`${
											new Date(
												currentYear,
												currentMonth,
												d
											).getTime() === selectedDate?.getTime()
												? 'active'
												: ''
										}`}
									>
										{d}
									</button>
								))}
							</Picker7ColGrid>
						</PickerBody>
					</PickerWrapper>
				)}
			</Container>
		</div>
	)
}

const PickerWrapper = styled.div`
	/* border: 1px solid red; */
	/* width: 500px; */
	width: 275px;
	border-radius: 6px;
	padding-bottom: 20px;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	box-shadow: rgba(0, 0, 0, 0.13) 0px 44px 45px,
		rgba(0, 0, 0, 0.07) 0px -12px 30px, rgba(0, 0, 0, 0.07) 0px 4px 6px,
		rgba(0, 0, 0, 0.09) 0px 12px 13px, rgba(0, 0, 0, 0.05) 0px -3px 5px;
	/* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
		rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
		rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */
	/* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
`

const Para = styled.p`
	font-weight: 500;
	font-size: 0.9rem;
	/* height: 10px;
	line-height: 0.4rem;
	padding-bottom: 0px;
	margin-bottom: 0px; */
	/* font-weight: 600; */
`

const PickerHeader = styled.div`
	/* width: 100%; */
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 10px;

	ion-icon {
		/* color: black; */
		font-size: 1.4rem;
		cursor: pointer;
	}

	${Para} {
		flex: 1 0 0;
	}

	button {
		background: none;
		border: none;

		&:disabled {
			opacity: 0.7;
		}
	}
`

const PickerBody = styled.div`
	margin: 5px;
`

const Picker7ColGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	/* border: 1px solid green; */
	row-gap: 0px;
	/* column-gap: 10px; */
	column-gap: 2px;

	${({ heading }) =>
		heading &&
		css`
			/* justify-content: center;
			align-items: center; */
			margin: 5px 8px;
			/* margin: 15px 0; */
			font-weight: 400;
			font-size: 0.75rem;
			color: gray;
			/* font-weight: bold; */
		`}

	button {
		background: none;
		border: none;

		&:disabled {
			opacity: 0.7;
			text-decoration: line-through;
		}
	}

	${({ heading }) =>
		!heading &&
		css`
			button {
				height: 32px;
				/* height: 50px; */
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 15px;
				outline: none;
			}
		`}

	#day {
		cursor: pointer;
	}

	.active {
		border: none;
		border-radius: 7px;
		background: #388697;
		color: #fff;
	}
`

const Container = styled.div`
	position: relative;
`
