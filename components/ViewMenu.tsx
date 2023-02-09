'use client'
import { useState, useContext } from 'react'
import { ViewMenuType } from '@/types/types'

import { BiTable } from 'react-icons/bi'
import { BsCalendar3 } from 'react-icons/bs'
import { HiOutlineViewBoards } from 'react-icons/hi'
import { AppContext } from '@/context/AppContext'
// import { AppContext } from '@/context/AppContext'

const viewMenu: ViewMenuType[] = [
	{
		label: 'Table',
		icon: <BiTable size={20} className='pr-1' />,
	},
	{
		label: 'Calendar',
		icon: <BsCalendar3 size={16} className='relative pr-1 top-[2px]' />,
	},
	{
		label: 'Board',
		icon: <HiOutlineViewBoards size={21} className='pr-1 -top-[2px]' />,
	},
]

interface Props {
	name?: string
}

const ViewMenu: React.FC<Props> = ({ name = 'View Menu Name???' }) => {
	// const [activeView, setActiveView] = useState('Table')
	const { activeView, handleSelectActiveView } = useContext(AppContext)

	return (
		<nav className='border-b-[1px] border-gray-200'>
			<h1 className='m-2 text-2xl font-bold text-gray-800'>{name}</h1>
			<ul className='flex flex-row text-left border-gray-200 border-b-1'>
				{viewMenu.map((item, i) => (
					<div
						className={`${
							activeView === item.label
								? 'border-b-2 border-gray-600'
								: ''
						} mr-2`}
						key={i}
						onClick={() => handleSelectActiveView(item.label)}
					>
						<li
							className={`${
								activeView === item.label
									? 'text-gray-800'
									: 'text-gray-500'
							} flex px-2 py-1 my-[3px] font-semibold rounded-md text-sm hover:bg-gray-100`}
							// style={{
							// 	textDecoration:
							// 		activeView === item.label ? 'underline' : 'none',
							// }}
						>
							{item.icon}
							{item.label}
						</li>
					</div>
				))}
			</ul>
		</nav>
	)
}

export default ViewMenu
