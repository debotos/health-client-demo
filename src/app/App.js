import React, { Component } from 'react'
import styled from 'styled-components'
import { StickyContainer, Sticky } from 'react-sticky'
import { Progress } from 'semantic-ui-react'
import { Tabs } from 'antd'
import { Container } from 'styled-bootstrap-grid'
import { FaRegUser, FaLandmark, FaUserTie, FaRegFileAlt, FaRegHandshake } from 'react-icons/fa'

import './App.scss'
import Header from '../components/common/Header'
/* Forms */
import AgreementInfoForm from '../components/EmploymentApplication/AgreementInfoForm'
import EducationInfoForm from '../components/EmploymentApplication/EducationInfoForm'
import EmploymentInfoForm from '../components/EmploymentApplication/EmploymentInfoForm'
import PersonalInfoForm from '../components/EmploymentApplication/PersonalInfoForm'
import ReferencesInfoForm from '../components/EmploymentApplication/ReferencesInfoForm'

const { TabPane } = Tabs
const tabs = [
	{
		id: 'personal',
		title: 'Personal',
		icon: <FaRegUser />,
		component: (props) => <PersonalInfoForm {...props} />,
	},
	{
		id: 'education',
		title: 'Education',
		icon: <FaLandmark />,
		component: (props) => <EducationInfoForm {...props} />,
	},
	{
		id: 'employment',
		title: 'Employment',
		icon: <FaUserTie />,
		component: (props) => <EmploymentInfoForm {...props} />,
	},
	{
		id: 'references',
		title: 'References',
		icon: <FaRegFileAlt />,
		component: (props) => <ReferencesInfoForm {...props} />,
	},
	{
		id: 'agreement',
		title: 'Agreement',
		icon: <FaRegHandshake />,
		component: (props) => <AgreementInfoForm {...props} />,
	},
]

class App extends Component {
	renderTabBar = (props, DefaultTabBar) => (
		<Sticky bottomOffset={80}>
			{({ style, isSticky }) => (
				<div
					style={{
						...style,
						zIndex: 9,
						backgroundColor: isSticky ? '#fff' : 'transparent',
						pointerEvents: 'none',
					}}
				>
					<DefaultTabBar {...props} style={{ textAlign: 'center', backgroundColor: '#fff' }} />
					{this.getProgress()}
				</div>
			)}
		</Sticky>
	)

	getProgress = () => {
		return (
			<Container>
				<Progress progress='percent' percent={50} success size='small' />
			</Container>
		)
	}

	onTabChange = (key) => {
		this.setState({ current: key })
	}

	constructor(props) {
		super(props)
		this.state = {
			current: tabs[0].id,
		}
	}

	render() {
		const { current } = this.state

		return (
			<>
				<Header />

				<StickyContainer>
					<Tabs
						tabPosition={'top'}
						renderTabBar={this.renderTabBar}
						animated={false}
						activeKey={current}
						onChange={this.onTabChange}
					>
						{tabs.map((tab, index) => {
							const totalTabs = tabs.length
							const currentTabPosition = index + 1
							const nextTabId = currentTabPosition < totalTabs ? tabs[index + 1].id : null
							const prevTabId = currentTabPosition !== 1 ? tabs[index - 1].id : null
							const { id, title, icon, component: ApplicationForm } = tab
							const TabHead = (
								<TabHeadItem>
									<span>{icon}</span>
									<span>{title}</span>
								</TabHeadItem>
							)

							return (
								<TabPane tab={TabHead} key={id}>
									<div style={{ paddingBottom: '25px' }}>
										<ApplicationForm
											id={id}
											nextTabId={nextTabId}
											prevTabId={prevTabId}
											goToNextTab={() => {
												if (nextTabId) {
													this.setState({ current: nextTabId })
												}
											}}
											goToPrevTab={() => {
												if (prevTabId) {
													this.setState({ current: prevTabId })
												}
											}}
										/>
									</div>
								</TabPane>
							)
						})}
					</Tabs>
				</StickyContainer>
			</>
		)
	}
}

export default App

const TabHeadItem = styled.span`
	display: flex;
	span {
		margin: 0 5px;
		svg {
			font-weight: bold;
			font-size: 20px;
		}
	}
`
