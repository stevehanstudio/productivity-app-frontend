import React, { useMemo } from 'react'

import { TaskType } from '@/types/types'
import { Grid } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme.alpine.css'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const columnDefs = [
	{ field: 'name' },
	{ field: 'status' },
	{ field: 'dateDue' },
]

interface Props {
  tasks: TaskType[]
}

const ProjectGrid: React.FC<Props> = ({ tasks }) => {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true
  }), [])

  return (
		<div className='ag-theme-alphine' style={{ height: 500, width: 650 }}>
			<AgGridReact
        rowData={tasks}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={defaultColDef}
      />
		</div>
	)
}

export default ProjectGrid
