import React, { Component } from 'react'
import { Label, Segment } from 'semantic-ui-react'
import { Form, Select, Input, Divider, Button, Modal } from 'antd'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { PlusOutlined } from '@ant-design/icons'

import EmergencyContactTable from './EmergencyContactTable'
import EmergencyContactAdd from './EmergencyContactAdd'
import EmergencyContactEdit from './EmergencyContactEdit'

const { Option } = Select
const types = [
	{ key: 1, title: 'RN', value: 'RN' },
	{ key: 2, title: 'LPN', value: 'LPN' },
	{ key: 3, title: 'PT', value: 'PT' },
	{ key: 4, title: 'PTA', value: 'PTA' },
]
const countries = [
	{ key: 1, name: 'Bucks', value: 'Bucks' },
	{ key: 2, name: 'Carbon', value: 'Carbon' },
	{ key: 3, name: 'Lehigh', value: 'Lehigh' },
	{ key: 4, name: 'Northampton', value: 'Northampton' },
]
const positions = [
	{ key: 1, name: 'Pediatrics', value: 'Pediatrics' },
	{ key: 2, name: 'Infusion Nurse', value: 'Infusion Nurse' },
	{ key: 3, name: 'Shift Work', value: 'Shift Work' },
	{ key: 4, name: 'PTA', value: 'PTA' },
]

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DE', 'FL', 'GA'].map((x, i) => ({
	key: i,
	name: x,
	value: x,
}))

export const phoneTypes = [
	{ key: 1, name: 'Home', value: 'Home' },
	{ key: 2, name: 'Work', value: 'Work' },
	{ key: 3, name: 'Cell', value: 'Cell' },
	{ key: 4, name: 'Pager', value: 'Pager' },
]
export const relationshipTypes = [
	{ key: 1, person: 'Father', value: 'Father' },
	{ key: 2, person: 'Mother', value: 'Mother' },
	{ key: 3, person: 'Brother', value: 'Brother' },
	{ key: 4, person: 'Sister', value: 'Sister' },
]

export class PersonalInfoForm extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.state = {
			contactAddModal: false,
			contactEditModal: false,
			contacts: [],
			contactEditingData: null,
		}
	}
	render() {
		return (
			<Container>
				<Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
					{/* 1. Position Applying for */}
					<Segment raised>
						<Label as='a' color='teal' ribbon>
							Position Applying for
						</Label>

						<Row style={{ marginTop: '10px' }}>
							<Col md='4'>
								<Form.Item
									label='Type'
									labelAlign='left'
									name='type'
									rules={[{ required: true, message: 'Please select type!' }]}
								>
									<Select allowClear={true} placeholder='Select Type'>
										{types.map((type) => {
											const { key, title, value } = type
											return (
												<Option key={key} value={value}>
													{title}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Country'
									labelAlign='left'
									name='country'
									rules={[{ required: true, message: 'Please select country!' }]}
								>
									<Select allowClear={true} placeholder='Select Country'>
										{countries.map((country) => {
											const { key, name, value } = country
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Position'
									labelAlign='left'
									name='position'
									rules={[{ required: true, message: 'Please select position!' }]}
								>
									<Select allowClear={true} placeholder='Available Positions'>
										{positions.map((position) => {
											const { key, name, value } = position
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
						</Row>
					</Segment>
					{/* 2. Personal */}
					<Segment raised>
						<Label as='a' color='teal' ribbon>
							Personal
						</Label>
						{/* Name Fields */}
						<Divider style={{ margin: '10px 0 5px 0' }}>Name</Divider>
						<Row>
							<Col md='3'>
								<Form.Item
									label='First'
									labelAlign='left'
									name='first'
									rules={[{ required: true, message: 'Provide first name!' }]}
								>
									<Input allowClear={true} placeholder='First name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Middle'
									labelAlign='left'
									name='middle'
									rules={[{ required: true, message: 'Provide middle name!' }]}
								>
									<Input allowClear={true} placeholder='Middle name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Last'
									labelAlign='left'
									name='last'
									rules={[{ required: true, message: 'Provide last name!' }]}
								>
									<Input allowClear={true} placeholder='Last name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Maiden'
									labelAlign='left'
									name='maiden'
									rules={[{ required: true, message: 'Provide maiden name!' }]}
								>
									<Input allowClear={true} placeholder='Maiden name' />
								</Form.Item>
							</Col>
						</Row>

						{/* Address Fields */}
						<Divider style={{ margin: '15px 0 5px 0' }}>Address</Divider>
						<Row>
							<Col md='4'>
								<Form.Item
									label='Street'
									labelAlign='left'
									name='street'
									rules={[{ required: true, message: 'Provide street address!' }]}
								>
									<Input allowClear={true} placeholder='Street address' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='City'
									labelAlign='left'
									name='city'
									rules={[{ required: true, message: 'Provide city name!' }]}
								>
									<Input allowClear={true} placeholder='City name' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='State'
									labelAlign='left'
									name='state'
									rules={[{ required: true, message: 'Select your state!' }]}
								>
									<Select showSearch allowClear={true} placeholder='Select state'>
										{states.map((type) => {
											const { key, name, value } = type
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='Zip code'
									labelAlign='left'
									name='zip'
									rules={[{ required: true, message: 'Provide zip code!' }]}
								>
									<Input allowClear={true} placeholder='Zip code' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='Country'
									labelAlign='left'
									name='country'
									rules={[{ required: true, message: 'Provide country!' }]}
								>
									<Input allowClear={true} placeholder='Country name' />
								</Form.Item>
							</Col>
						</Row>

						{/* Contact Fields */}
						<Divider style={{ margin: '15px 0 5px 0' }}>Contact</Divider>
						<Row>
							<Col md='3'>
								<Form.Item
									label='Phone Type'
									labelAlign='left'
									name='phoneType'
									rules={[{ required: true, message: 'Select phone type!' }]}
								>
									<Select allowClear={true} placeholder='Select phone type'>
										{phoneTypes.map((type) => {
											const { key, name, value } = type
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Phone Number'
									labelAlign='left'
									name='phoneNumber'
									rules={[{ required: true, message: 'Provide phone number!' }]}
								>
									<Input allowClear={true} placeholder='Phone number' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Email Address'
									labelAlign='left'
									name='email'
									rules={[
										{ required: true, message: 'Provide email address!' },
										{ type: 'email', message: 'Invalid email address!' },
									]}
								>
									<Input allowClear={true} placeholder='Email address' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Social Security No'
									labelAlign='left'
									name='socialSecurityNo'
									rules={[{ required: true, message: 'Provide social security no!' }]}
								>
									<Input allowClear={true} placeholder='Social security no' />
								</Form.Item>
							</Col>
						</Row>
					</Segment>
					{/* 3. Emergency Contact/Relationship */}
					<Segment raised>
						<Label as='a' color='teal' ribbon>
							Emergency Contact/Relationship
						</Label>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 16 }}
								onClick={() => this.setState({ contactAddModal: true })}
							>
								Add
							</Button>
						</div>
						<EmergencyContactTable
							data={this.state.contacts}
							handleDelete={(key) => {
								const update = this.state.contacts.filter((x) => x.key !== key)
								this.setState({ contacts: update })
							}}
							editContactData={(contactData) => {
								this.setState({ contactEditingData: contactData }, () =>
									this.setState({ contactEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Emergency Contact/Relationship'
							visible={this.state.contactAddModal}
							footer={null}
							onCancel={() => this.setState({ contactAddModal: false })}
						>
							<EmergencyContactAdd
								onAddSuccess={(data) => {
									const { contacts } = this.state
									this.setState({ contactAddModal: false, contacts: [data, ...contacts] })
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Emergency Contact/Relationship'
							visible={this.state.contactEditModal}
							footer={null}
							onCancel={() => this.setState({ contactEditModal: false, contactEditingData: null })}
						>
							<EmergencyContactEdit
								onEditSuccess={(data) => {
									const { contacts } = this.state
									const update = contacts.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ contactEditModal: false, contacts: update })
								}}
								data={this.state.contactEditingData}
							/>
						</Modal>
						<br />
						Magna enim incididunt do adipisicing irure exercitation quis officia reprehenderit
						veniam ea. Irure ea non adipisicing nulla amet nostrud duis aute. Qui velit ullamco
						aliqua ad amet aute ut est. Adipisicing enim exercitation Lorem dolor. Proident
						adipisicing magna aliqua nulla dolor esse nostrud. Aliquip dolore reprehenderit amet non
						est commodo qui ipsum. Velit cupidatat veniam ullamco veniam nulla. Exercitation et
						nostrud do exercitation voluptate consequat. Proident sint laboris elit nulla nisi est
						adipisicing deserunt elit cillum officia enim esse sint. Velit pariatur cillum eiusmod
						voluptate excepteur. Duis fugiat ullamco ut quis sit excepteur cillum nostrud sit
						cupidatat cupidatat reprehenderit quis. Commodo do pariatur velit aliquip proident minim
						nisi. Labore fugiat pariatur ad ut esse velit elit aute ea est exercitation amet
						laborum. Duis est ad esse pariatur eiusmod adipisicing ad laborum dolor id. Qui
						adipisicing ea ut ex. Ut esse ex officia ipsum qui esse tempor consequat ad elit.
						Ullamco amet nostrud ea aliquip eu velit ad nisi culpa adipisicing sunt. Duis
						exercitation laboris in do tempor. Aliqua quis aliqua ipsum sunt enim veniam amet
						excepteur dolor ex. Aliquip consectetur labore eu eu eu voluptate nisi Lorem qui esse
						sit eiusmod. Sint reprehenderit amet nostrud nisi. Anim eiusmod fugiat incididunt veniam
						ea veniam deserunt elit mollit dolor eu duis voluptate. Veniam labore dolore esse in
						dolor tempor anim ut quis irure nisi ad labore ipsum. Fugiat proident incididunt ad aute
						esse anim sunt do eu. Laboris cupidatat aliquip aliquip excepteur. Culpa amet anim ad
						eiusmod do aliqua eiusmod. Exercitation fugiat tempor officia labore aliquip ea
						excepteur. Esse consectetur laboris ipsum in laborum dolore do minim sint aute. Anim
						nulla est qui ullamco voluptate nostrud quis. Pariatur anim nostrud ullamco voluptate
						enim sit in duis duis mollit adipisicing. Consectetur aliqua adipisicing incididunt amet
						pariatur. Enim exercitation reprehenderit dolor incididunt proident culpa Lorem.
						Reprehenderit et ipsum reprehenderit quis cupidatat occaecat cupidatat anim.
					</Segment>
				</Form>
			</Container>
		)
	}
}

export default PersonalInfoForm
