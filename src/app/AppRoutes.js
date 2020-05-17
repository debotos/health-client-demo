import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import PrivateRoute from '../utils/PrivateRoute'
import PublicRoute from '../utils/PublicRoute'

import EmploymentApplication from '../pages/EmploymentApplication'
import JobListing from '../pages/JobListing'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

export const history = createHistory()

function AppRoutes() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/jobs' component={JobListing} />

				<PublicRoute exact path='/login' component={Login} />
				<PublicRoute exact path='/signup' component={SignUp} />

				<PrivateRoute exact path='/apply' component={EmploymentApplication} />
				<PrivateRoute exact path='/' component={Dashboard} />
			</Switch>
		</Router>
	)
}

export default AppRoutes
