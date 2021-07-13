import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'
import Table from '@/components/table'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	root: {},
})

function App() {
	return (
		<Grid item xs={12}>
			<Table />
		</Grid>
	)
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
