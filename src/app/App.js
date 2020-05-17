import React, { Component } from 'react'
import { Provider } from 'react-redux'

import './App.scss'
import AppRoutes from './AppRoutes'
import store from '../redux/store'
import LoadingCenter from '../components/UI/Loading/LoadingCenter'

export class App extends Component {
	async componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 2000)
		// TODO:
		// Check for token validity
		// Set loading: false
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
		}
	}

	render() {
		const { loading } = this.state

		if (loading) return <LoadingCenter />

		return (
			<Provider store={store}>
				<AppRoutes />
			</Provider>
		)
	}
}

export default App
