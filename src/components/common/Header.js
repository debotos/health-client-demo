import React, { Component } from 'react'
import styled from 'styled-components'
import { Swipeable } from 'react-swipeable'
import { MdMenu } from 'react-icons/md'
import { Transition } from 'semantic-ui-react'

import DrawerNavigation from '../../navigation'
import Backdrop from '../../navigation/Backdrop'
import Loader from '../UI/Loading/Overlay'
import { history } from '../../app/AppRoutes'
import Logo from '../../assets/logo.png'

export class Header extends Component {
	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	state = { sideDrawerOpen: false, loading: false }

	setLoading = (loading) => this._isMounted && this.setState({ loading })

	/* Drawer Handler */
	drawerToggleHandler = () => {
		this._isMounted &&
			this.setState((prevState) => {
				return { sideDrawerOpen: !prevState.sideDrawerOpen }
			})
	}

	backdropClickHandler = () => {
		this._isMounted && this.setState({ sideDrawerOpen: false })
	}

	render() {
		const { sideDrawerOpen, loading } = this.state
		const { title, sticky = false, bgColor } = this.props

		return (
			/*
				When you place a position:sticky element inside another element things can get tricky 
				you may need to set the display property of your parent elements to something besides block.
				You can probably set it to inline or inline-block as well depending on your needs.
			*/
			<>
				<header style={{ display: 'initial' }}>
					<Container sticky={sticky} bgcolor={bgColor}>
						<div style={{ flex: 1 }}>
							<MenuButton onClick={this.drawerToggleHandler}>
								<MenuIcon />
							</MenuButton>
						</div>

						<LogoContainer>
							<AppLogo src={Logo} alt='Care Pine Home Health' onClick={() => history.push('/')} />
							{title && <h3 style={{ margin: '5px 0' }}>{title}</h3>}
						</LogoContainer>

						<div style={{ flex: 1 }} />
					</Container>
				</header>
				{/* Swipeable area */}
				{!sideDrawerOpen && (
					<SwipeableArea
						onSwipedRight={() => this._isMounted && this.setState({ sideDrawerOpen: true })}
						trackMouse
					/>
				)}
				{/* Side Drawer Navigation Portion */}
				<DrawerNavigation
					show={sideDrawerOpen}
					closeDrawer={this.drawerToggleHandler}
					setLoading={this.setLoading}
				/>
				{/* Side Drawer Navigation Backdrop */}
				{sideDrawerOpen && (
					<Transition visible={sideDrawerOpen} animation='fade'>
						<Backdrop click={this.backdropClickHandler} />
					</Transition>
				)}
				{/* Logging off loading */}
				{loading && <Loader msg='Logging off...' msgColor='#fff' />}
			</>
		)
	}
}

export default Header

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 10px 10px;

	/* To make it sticky */
	position: ${(props) => props.sticky && 'sticky'};
	top: ${(props) => props.sticky && '0'};
	z-index: ${(props) => props.sticky && '99'};
	background-color: ${(props) => props.sticky && '#edf2f7'};
	box-shadow: ${(props) => props.sticky && `0 .125rem .25rem rgba(0,0,0,.075)!important`};
	background-color: ${(props) => props.bgcolor};
`

const LogoContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const AppLogo = styled.img`
	max-width: 150px;
	height: auto;
	cursor: pointer;
`

const MenuIcon = styled(MdMenu)`
	color: #fff;
	font-size: 1.5rem;
	opacity: 0.8;
`

const SwipeableArea = styled(Swipeable)`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	min-height: 100vh;
	width: 15px;
	background-color: transparent;
	cursor: e-resize;
`

const MenuButton = styled.div`
	height: 40px;
	width: 40px;
	background-color: #6459f5;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:active,
	&:hover {
		opacity: 0.8;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3), inset 1px 0 1px rgba(255, 255, 255, 0.1),
			inset 0 1px 1px rgba(255, 255, 255, 0.1);
	}
`
