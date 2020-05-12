import React, { Component } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Input, Tabs, Button } from 'antd'
import { Segment } from 'semantic-ui-react'
import { SearchOutlined, EnvironmentFilled } from '@ant-design/icons'

import Header from '../../components/common/Header'

const tabs = [
	{ id: 'all', title: 'All' },
	{ id: 'web-designer', title: 'Web Designer' },
	{ id: 'web-developer', title: 'Web Developer' },
]

export class JobListing extends Component {
	render() {
		return (
			<>
				<Header sticky={true} />

				<Container style={{ marginTop: 20, marginBottom: 30 }}>
					<Segment raised>
						<h2>Find A Job</h2>
						<Row>
							<Col md='5' style={{ marginBottom: 10 }}>
								<Input placeholder='Skills, Designations, Companies' prefix={<SearchOutlined />} />
							</Col>
							<Col md='5' style={{ marginBottom: 10 }}>
								<Input placeholder='Enter Locations…' prefix={<EnvironmentFilled />} />
							</Col>
							<Col md='2' style={{ marginBottom: 10 }}>
								<Button icon={<SearchOutlined />} type='primary' htmlType='button'>
									Submit
								</Button>
							</Col>
						</Row>
					</Segment>

					<Tabs tabPosition={'top'} animated={false}>
						{tabs.map((tab) => {
							const { id, title } = tab
							return (
								<Tabs.TabPane tab={<span>{title}</span>} key={id}>
									<div style={{ paddingBottom: '25px' }}>{title}</div>
								</Tabs.TabPane>
							)
						})}
					</Tabs>
				</Container>
			</>
		)
	}
}

export default JobListing
