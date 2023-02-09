import MainMenu from '@/components/MainMenu'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import ReactQueryWrapper from './ReactQueryWrapper'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const TW_ELEMENTS_PATH = 'node_modules/tw-elements'
	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body className='h-[100vh]'>
				<ReactQueryWrapper>
					<AppProvider>
						<div className='h-full'>
							<h1 className='p-3 text-2xl font-semibold text-red-500 border-b-2'>
								My Productivity App
							</h1>
							<div className='flex flex-row h-full'>
								<MainMenu />
								{children}
							</div>
						</div>
					</AppProvider>
				</ReactQueryWrapper>
			</body>
		</html>
	)
}
