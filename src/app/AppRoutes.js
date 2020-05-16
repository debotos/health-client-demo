import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import EmploymentApplication from '../pages/EmploymentApplication'
import JobListing from '../pages/JobListing'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

export const history = createHistory()

function AppRoutes() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/' render={() => <JobListing />} />
				<Route exact path='/apply' render={() => <EmploymentApplication />} />
				<Route exact path='/signup' render={() => <SignUp />} />
				<Route exact path='/login' render={() => <Login />} />
			</Switch>
		</Router>
	)
}

export default AppRoutes
