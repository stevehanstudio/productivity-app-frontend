'use client'

import React from 'react'
import { QueryClient } from '@tanstack/react-query'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient()
const persister = createSyncStoragePersister({
	storage: window.localStorage
})

interface Props {
	children: JSX.Element
}

const ReactQueryWrapper: React.FC<Props> = ({ children }) => {
	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
		{/* <QueryClientProvider client={queryClient}> */}
			{children}
			<ReactQueryDevtools />
		</PersistQueryClientProvider>
	)
}

export default ReactQueryWrapper
