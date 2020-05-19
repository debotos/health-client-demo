import React from 'react'
import styled from 'styled-components'
import media from 'styled-media-query'
import { FiXCircle, FiLogOut } from 'react-icons/fi'

// UI elements to create side navigation

/* 1 */
const CloseBtn = styled(FiXCircle)`
	color: #47525d;
	opacity: 0.5;
	font-size: 1.8rem;
	cursor: pointer;
	border-radius: 50%;
	&:active,
	&:hover {
		opacity: 1;
	}
	${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    font-size: 1.6rem;
	`}
`
export const CloseButton = ({ onClick }) => <CloseBtn onClick={() => onClick()} />

/* 2 */
export const LogoffBtn = styled(FiLogOut)`
	color: #47525d;
	opacity: 0.5;
	font-size: 1.8rem;
	cursor: pointer;
	border-radius: 50%;
	&:active,
	&:hover {
		opacity: 1;
	}
	${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    font-size: 1.6rem;
	`}
`

/* 3 */
export const NavArea = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	flex: 1;
	flex-direction: column;
	padding: 50px 20px 0 20px;
	background-color: #c2d0db;

	/* For ScrollBar */
	overflow-y: scroll;
	::-webkit-scrollbar {
		/* WebKit */
		width: 0;
		height: 0;
	}
	/* Firefox */
	scrollbar-width: none;
	/* IE 10+ */
	-ms-overflow-style: none;
	ul {
		margin: 0;
		padding: 0;
		height: 100%;
		list-style: none;
		display: flex;
		flex-direction: column;
		li {
			opacity: 0.8;
			&:hover {
				opacity: 1;
			}
			a {
				color: #47525d;
				text-decoration: none;
				font-size: 16px;
				font-weight: 600;
				width: 100%;
				display: inline-block;
				padding: 10px 0;
				border-radius: 5px;
				padding-left: 10px;
				display: flex;
				align-items: center;
				.nav-icon {
					margin-right: 10px;
					display: flex;
					align-items: center;
					svg {
						font-size: 1.2rem;
					}
				}
			}
			a.active {
				background-color: #379503;
				color: #fff;
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3), inset 1px 0 1px rgba(255, 255, 255, 0.1),
					inset 0 1px 1px rgba(255, 255, 255, 0.1);
			}
		}
		li:last-child {
			margin-bottom: 20px;
		}
	}
	${media.lessThan('medium')`
		/* screen width is less than 768px (medium) */
		padding: 45px 15px 0 15px;
		ul li {
			a {
				font-size: 15px;
				padding: 8px 0;
				padding-left: 10px;
				.nav-icon {
					margin-right: 5px;
				}
			}
		}
	`}
`

/* 4 */
export const ActionContainer = styled.div`
	position: absolute;
	top: 5px;
	left: 0;
	right: 0;
	height: 40px;
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
`
