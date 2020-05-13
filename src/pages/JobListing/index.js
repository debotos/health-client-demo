import React, { Component } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Input, Tabs, Button, Avatar } from 'antd'
import { Segment } from 'semantic-ui-react'
import { SearchOutlined, EnvironmentFilled, CheckCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { FaSearch, FaAngleRight } from 'react-icons/fa'

import Header from '../../components/common/Header'
import { randomString } from '../../utils/helpers'

const features = [
	'Visualizing creative ideas with clients.',
	'Testing and improving the design of the website.',
	'Maintaining the appearance of websites by enforcing content standards.',
	'Designing visual imagery for website and ensuring that they are in line with branding for clients',
	'Working with different content management systems.',
	'Designing sample pages including colours and fonts.',
	'Preparing design plans and presenting the website structure.',
]
const remarks = 'Opportunities in Night Shift for faster growth.'
const jobs = [
	{
		id: randomString(),
		category: ['web-designer'],
		position: 'Web Designer',
		experience: '3+ years',
		location: 'California',
		features,
		remarks,
		logo: null,
	},
	{
		id: randomString(),
		category: ['web-developer'],
		position: 'Web Developer',
		experience: '3+ years',
		location: 'California',
		features,
		remarks,
		logo: null,
	},
	{
		id: randomString(),
		category: ['web-developer', 'software-engineer'],
		position: 'Software Engineer',
		experience: '3+ years',
		location: 'California',
		features,
		remarks,
		logo: 'https://www.heirizon.com/heirizon.jpg',
	},
]

const tabs = [
	{ id: 'all', title: 'All' },
	{ id: 'web-designer', title: 'Web Designer' },
	{ id: 'web-developer', title: 'Web Developer' },
	{ id: 'software-engineer', title: 'Software Engineer' },
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
									Search
								</Button>
							</Col>
						</Row>
					</Segment>

					<Tabs tabPosition={'top'} animated={false}>
						{tabs.map((tab) => {
							const { id, title } = tab
							let results = jobs
							if (id !== 'all') {
								results = jobs.filter((job) => job.category.includes(id))
							}
							return (
								<Tabs.TabPane tab={<span>{title}</span>} key={id}>
									{results.map((job) => {
										const { id, logo, position, experience, location, features, remarks } = job
										return (
											<Segment raised key={id}>
												<Row>
													<Col md='4'>
														<JobHead>
															<div style={{ textAlign: 'center' }}>
																{logo ? (
																	<Avatar src={logo} size={80} />
																) : (
																	<FaSearch style={{ opacity: 0.7, fontSize: '80px' }} />
																)}
															</div>
															<HeadItem>
																<p>Position</p>
																<span>{position}</span>
															</HeadItem>
															<HeadItem>
																<p>Experience</p>
																<span>{experience}</span>
															</HeadItem>
															<HeadItem>
																<p>Location</p>
																<span>{location}</span>
															</HeadItem>
														</JobHead>
													</Col>
													<Col md='8'>
														<h3>{position}</h3>
														{features &&
															features.map((feature, index) => {
																return (
																	<Feature key={index}>
																		<FaAngleRight /> <span>{feature}</span>
																	</Feature>
																)
															})}

														<h4 style={{ margin: '12px 0' }}>Remarks: {remarks}</h4>

														<Button
															icon={<CheckCircleOutlined />}
															type='primary'
															htmlType='button'
															onClick={() => {}}
														>
															Apply
														</Button>
													</Col>
												</Row>
											</Segment>
										)
									})}
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

const JobHead = styled.div``
const HeadItem = styled.div`
	margin-bottom: 15px;
	p {
		margin-bottom: 0;
	}
	span {
		font-weight: bold;
	}
`
const Feature = styled.p`
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	span {
		margin-left: 5px;
	}
	svg {
		min-width: 20px;
		font-size: 18px;
		margin-left: -5px;
	}
	@media screen and (max-width: 770px) {
		align-items: flex-start;
	}
`
