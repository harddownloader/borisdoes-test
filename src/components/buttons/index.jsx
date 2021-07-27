import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import FilterListIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
		position: 'relative',
		minHeight: 200,
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: 1,
	},
}))

export function FabButton(props) {
	const classes = useStyles()
  const [isSort, setIsSort] = useState(false)

	const fab = {
		color: 'primary',
		className: classes.fab,
		icon: <FilterListIcon />,
		label: 'Add',
	}

	return (
		<Fab aria-label={fab.label} className={fab.className} color={fab.color}>
			{fab.icon}
		</Fab>
	)
}
