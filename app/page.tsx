// import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
// import MainMenu from '@/components/MainMenu'
import ViewMenu from '@/components/ViewMenu'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
		<main>
				{/* <MainMenu /> */}
				<ViewMenu />
		</main>
  )
}
