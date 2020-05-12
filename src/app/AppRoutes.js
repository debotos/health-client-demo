import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import EmploymentApplication from '../pages/EmploymentApplication'
import JobListing from '../pages/JobListing'

export const history = createHistory()

function AppRoutes() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/' render={() => <JobListing />} />
				<Route exact path='/apply' render={() => <EmploymentApplication />} />
			</Switch>
		</Router>
	)
}

export default AppRoutes
