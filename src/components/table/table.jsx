import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { FabButton } from './../buttons'

export default function DataGridDemo() {
	const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])

  const [notes, setNotes] = useState([])

	const [desctopRows, setDesctopRows] = useState([
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
	])

	useEffect(() => {
		fetch('https://api.hnpwa.com/v0/news/1.json')
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log(data)
				setNotes(data)
			})
		return () => {}
	}, [])

	const [desctopColumns, setDesctopColumns] = useState([
		// { field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'time_ago',
			headerName: 'Time added',
			width: 200,
			editable: false,
		},
		{
			field: 'title',
			headerName: 'Title',
			width: 200,
			editable: false,
		},
		{
			field: 'domain',
			headerName: 'Domain',
			width: 200,
			editable: false,
		},
		// {
		// 	field: 'fullName',
		// 	headerName: 'Full name',
		// 	description: 'This column has a value getter and is not sortable.',
		// 	sortable: false,
		// 	width: 160,
		// 	valueGetter: params =>
		// 		`${params.getValue(params.id, 'firstName') || ''} ${
		// 			params.getValue(params.id, 'lastName') || ''
		// 		}`,
		// },
	])

	const [mobileColumns, setMobileColumns] = useState([
		// { field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'title',
			headerName: 'Title',
			width: '100%',
			editable: true,
		}
	])

	const decreaseCols = () => {
		setColumns([...mobileColumns])
	}

  const increaseCols = () => {
    setColumns([...desctopColumns])
  }

	const decreaseRows = () => {
		const newRows = [...rows]
		newRows.splice(0, 1)
		setRows(newRows)
	}

	const increaseRows = () => {}

  const [isSort, setIsSort] = useState(null)
  const sortByColumns = () => {
    let newSort = null
    if (!isSort) {
      newSort = 'asc'
    } else if (isSort === 'asc') {
      newSort = 'desc'
    }
    setIsSort(newSort)
  }

  const updateSortFromUser = (event) => {
    setIsSort(event.sortModel[0].sort)
  }

	return (
		<div style={{ height: 400, width: '100%' }}>
			<button onClick={decreaseCols}>mobile</button>
			<button onClick={increaseCols}>desctop</button>
      <button onClick={sortByColumns}>sort</button>
      <FabButton increaseCols={increaseCols} decreaseCols={decreaseCols}/>
			<DataGrid
				rows={notes}
				columns={columns}
				pageSize={5}
				sortModel={notes.length > 0 ? [
          {
          field: 'title',
          sort: isSort,
          }
				] : []}
        onSortModelChange={updateSortFromUser}
			/>
		</div>
	)
}
