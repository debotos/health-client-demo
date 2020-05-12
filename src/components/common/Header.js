import React from 'react'
import styled from 'styled-components'

import Logo from '../../assets/logo.png'

export default function Header({ title, sticky = false, bgColor }) {
	return (
		/*
			When you place a position:sticky element inside another element things can get tricky 
			you may need to set the display property of your parent elements to something besides block.
			You can probably set it to inline or inline-block as well depending on your needs.
		*/
		<header style={{ display: 'initial' }}>
			<Container sticky={sticky} bgcolor={bgColor}>
				<Image src={Logo} alt='Care Pine Home Health' />
				{title && <h3 style={{ margin: '5px 0' }}>{title}</h3>}
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

	/* To make it sticky */
	position: ${(props) => props.sticky && 'sticky'};
	top: ${(props) => props.sticky && '0'};
	z-index: ${(props) => props.sticky && '99'};
	background-color: ${(props) => props.sticky && '#edf2f7'};
	box-shadow: ${(props) => props.sticky && `0 .125rem .25rem rgba(0,0,0,.075)!important`};

	background-color: ${(props) => props.bgcolor};
`

const Image = styled.img`
	max-width: 150px;
	height: auto;
`
