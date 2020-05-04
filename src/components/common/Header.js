import React from 'react'
import styled from 'styled-components'

import Logo from '../../assets/logo.png'

export default function Header() {
	return (
		<header>
			<Container>
				<Image src={Logo} alt='Care Pine Home Health' />
				<h3 style={{ margin: '5px 0' }}>Application for Employment</h3>
			</Container>
		</header>
	)
}

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px 20px;
`
const Image = styled.img`
	max-width: 150px;
	height: auto;
`
