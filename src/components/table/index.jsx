import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
	root: {
		display: 'flex',
		marginTop: theme.spacing(3),
		overflowX: 'hide',
	},
	table: {
		minWidth: 340,
	},
	tableCell: {
		paddingRight: 4,
		paddingLeft: 5,
	},
})

function SimpleTable(props) {
	const { classes } = props

	const [notes, setNotes] = useState([])
  const [page, setPage] = useState(1)

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

	const getNewPage = number => {
		fetch(`https://api.hnpwa.com/v0/news/${number}.json`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log(data)
				const newNotesArr = notes.concat(data)
				setNotes(newNotesArr)
			})
	}

	window.onscroll = function (ev) {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			console.log('bottom')
      const nexPage = page + 1
      getNewPage(nexPage)
      setPage(nexPage)
		}
	}

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableCell}>Time added</TableCell>
						<TableCell numeric='true' className={classes.tableCell}>
							Title
						</TableCell>
						<TableCell numeric='true' className={classes.tableCell}>
							Domain
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{notes.map(note => {
						return (
							<TableRow key={note.id}>
								<TableCell
									component='th'
									scope='row'
									className={classes.TableCell}>
									{note.time}
								</TableCell>
								<TableCell numeric='true' className={classes.tableCell}>
									{note.title}
								</TableCell>
								<TableCell numeric='true' className={classes.tableCell}>
									{note.domain}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Paper>
	)
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleTable)
