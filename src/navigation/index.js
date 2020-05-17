import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import NonAuthenticateDrawer from './NonAuthenticateDrawer'
import AuthenticateDrawer from './AuthenticateDrawer'
import './drawer-navigation.css'

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	height: 100%;
	width: 100%;
	overflow-y: scroll;
	scrollbar-width: none;
	/* Firefox */
	-ms-overflow-style: none;
	/* IE 10+ */
	&::-webkit-scrollbar {
		/* WebKit */
		width: 0;
		height: 0;
	}
`

class sideDrawer extends React.Component {
	render() {
		const { show, auth, closeDrawer, setLoading } = this.props

		let drawerClasses = 'side-drawer'
		if (show) {
			drawerClasses = 'side-drawer open'
		}

		const { isAuthenticated, user } = auth

		return (
			<div className={drawerClasses}>
				<Container>
					{isAuthenticated ? (
						<AuthenticateDrawer user={user} closeDrawer={closeDrawer} setLoading={setLoading} />
					) : (
						<NonAuthenticateDrawer closeDrawer={closeDrawer} />
					)}
				</Container>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(sideDrawer)
