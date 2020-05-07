import React, { Component } from 'react'
import { Label, Segment } from 'semantic-ui-react'
import {
	Form,
	Select,
	InputNumber,
	Input,
	Divider,
	Button,
	Modal,
	Transfer,
	DatePicker,
	Checkbox,
	Radio,
	message,
} from 'antd'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import { phoneValidationRegex } from '../../../utils/helpers'
import EmergencyContactTable from './EmergencyContact/EmergencyContactTable'
import EmergencyContactAdd from './EmergencyContact/EmergencyContactAdd'
import EmergencyContactEdit from './EmergencyContact/EmergencyContactEdit'
import WorkHourInput from '../../UI/input/WorkHourInput'
import { initialWorkingHourData } from '../../UI/input/WorkHourInput'

const CheckboxGroup = Checkbox.Group
const { Option } = Select
const { TextArea } = Input
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
export const classificationPositionsData = [
	{ key: 1, title: `RN`, chosen: false },
	{ key: 2, title: `LPN`, chosen: false },
	{ key: 3, title: `PT`, chosen: false },
	{ key: 4, title: `OT`, chosen: false },
	{ key: 5, title: `CNA`, chosen: false },
]
export const salaryTypes = [
	{ key: 1, name: 'Per Visit', value: 'Per Visit' },
	{ key: 2, name: 'Hourly', value: 'Hourly' },
	{ key: 3, name: 'Monthly', value: 'Monthly' },
	{ key: 4, name: 'Yearly', value: 'Yearly' },
]

const FIELD_LICENSE_EVER_SUSPENDED = 'everLicenseSuspended'
const FIELD_HAVE_CAR_LICENSE = 'haveCarLicense'

const formInitialValues = { [FIELD_LICENSE_EVER_SUSPENDED]: false, [FIELD_HAVE_CAR_LICENSE]: false }

export class PersonalInfoForm extends Component {
	componentWillUnmount() {
		this.mounted = false
	}
	componentDidMount() {
		this.mounted = true
	}

	startProcessing = (saveAndContinue = false) => {
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)
		// 1. Emergency Contact Validation
		if (this.state.contacts.length === 0) {
			message.error('Please add emergency contacts!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 2. Working Hours Validation
		const workingHours = this.state.workingHours
		const workingHoursValueList = new Set(
			Object.keys(workingHours)
				.map((x) => workingHours[x])
				.map((y) => {
					const values = []
					Object.keys(y).forEach((item) => {
						if (typeof y[item] === 'boolean') {
							values.push(y[item].toString())
						}
					})
					return values
				})
				.flat()
		)
		// console.log(workingHoursValueList)
		if (workingHoursValueList.size === 1 && workingHoursValueList.has('false')) {
			message.error('Please select working hours!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				console.log('Success:', values)
				this.mounted && this.setState({ formProcessing: false })
				// TODO: Implement mechanism to save
				if (saveAndContinue) {
					this.props.goToNextTab()
				}
			})
			.catch((errorInfo) => {
				hide()
				message.error('Please fix the form errors!')
				this.mounted && this.setState({ formProcessing: false })
				console.log('Failed:', errorInfo)
			})
	}

	onFinish = (values) => {
		console.log('Success:', values)
		// Save & Continue
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
		this.state = {
			formProcessing: false,
			contactAddModal: false,
			contactEditModal: false,
			contacts: [],
			contactEditingData: null,
			targetKeys: [],
			workingHours: initialWorkingHourData,
			...formInitialValues,
		}
	}
	render() {
		return (
			<Container>
				<Form
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
					labelAlign='left'
					initialValues={formInitialValues}
				>
					{/* 1. Position Applying for */}
					<Segment raised>
						<Label as='a' color='teal' ribbon>
							Position Applying for
						</Label>

						<Row style={{ marginTop: '10px' }}>
							<Col md='4'>
								<Form.Item
									label='Type'
									name='type'
									rules={[{ whitespace: true, required: true, message: 'Please select type!' }]}
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
									name='country'
									rules={[{ whitespace: true, required: true, message: 'Please select country!' }]}
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
									name='position'
									rules={[{ whitespace: true, required: true, message: 'Please select position!' }]}
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
									name='first'
									rules={[
										{ whitespace: true, required: true, message: 'Provide first name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='First name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Middle'
									name='middle'
									rules={[
										{ whitespace: true, required: true, message: 'Provide middle name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Middle name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Last'
									name='last'
									rules={[
										{ whitespace: true, required: true, message: 'Provide last name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Last name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Maiden'
									name='maiden'
									rules={[
										{ whitespace: true, required: true, message: 'Provide maiden name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
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
									name='street'
									rules={[
										{ whitespace: true, required: true, message: 'Provide street address!' },
										{ min: 5, message: 'Too short!' },
										{ max: 150, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Street address' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='City'
									name='city'
									rules={[
										{ whitespace: true, required: true, message: 'Provide city name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 50, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='City name' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='State'
									name='state'
									rules={[{ whitespace: true, required: true, message: 'Select your state!' }]}
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
									name='zip'
									rules={[
										{ whitespace: true, required: true, message: 'Provide zip code!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Zip code' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='Country'
									name='country'
									rules={[
										{ whitespace: true, required: true, message: 'Provide country!' },
										{ min: 2, message: 'Too short!' },
										{ max: 50, message: 'Too long!' },
									]}
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
									name='phoneType'
									rules={[{ whitespace: true, required: true, message: 'Select phone type!' }]}
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
									name='phoneNumber'
									rules={[
										{ whitespace: true, required: true, message: 'Provide phone number!' },
										{ pattern: phoneValidationRegex, message: 'Phone number is invalid!' },
									]}
								>
									<Input allowClear={true} placeholder='Phone number' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Email Address'
									name='email'
									rules={[
										{ whitespace: true, required: true, message: 'Provide email address!' },
										{ type: 'email', message: 'Invalid email address!' },
									]}
								>
									<Input allowClear={true} placeholder='Email address' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Social Security No'
									name='socialSecurityNo'
									rules={[
										{ whitespace: true, required: true, message: 'Provide social security no!' },
										{ min: 2, message: 'Too short!' },
										{ max: 100, message: 'Too long!' },
									]}
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
								style={{ marginBottom: 5 }}
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
					</Segment>
					{/* Classification */}
					<Segment raised>
						<Label as='a' color='teal' ribbon>
							Classification
						</Label>
						{/* Positions (Transfer Input) */}
						<Row style={{ marginTop: '10px' }}>
							<Col
								md='12'
								style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
							>
								<Form.Item
									label='Select Positions'
									name='positions'
									rules={[{ required: true, message: 'Please select positions!' }]}
								>
									<Transfer
										dataSource={classificationPositionsData}
										titles={['Positions', 'Selected']}
										targetKeys={this.state.targetKeys}
										onChange={(targetKeys) => this.setState({ targetKeys })}
										showSearch
										filterOption={(inputValue, option) =>
											option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
										}
										render={(item) => item.title}
										listStyle={{ minWidth: 240, minHeight: 270 }}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row style={{ marginTop: '10px' }}>
							<Col md='4'>
								<Form.Item
									label='License/Certification'
									name='license'
									rules={[
										{ whitespace: true, required: true, message: 'Provide license/certification!' },
										{ min: 3, message: 'Too short!' },
										{ max: 200, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='License/Certification' />
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='State Issued'
									name='stateIssued'
									rules={[{ whitespace: true, required: true, message: 'Select issued state!' }]}
								>
									<Select showSearch allowClear={true} placeholder='Select issued state'>
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
							<Col md='4'>
								<Form.Item
									label='Expiration Date'
									name='expirationDate'
									rules={[{ required: true, message: 'Select expiration date!' }]}
								>
									<DatePicker
										allowClear={true}
										placeholder='Select expiration date'
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row style={{ marginTop: '10px' }}>
							<Col md='12' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
								<span style={{ marginRight: 10, marginBottom: 5 }}>
									Has your license ever been suspended or revoked?
								</span>
								<Form.Item name={FIELD_LICENSE_EVER_SUSPENDED}>
									<Radio.Group
										onChange={(e) =>
											this.setState({ [FIELD_LICENSE_EVER_SUSPENDED]: e.target.value })
										}
									>
										<Radio value={true}>Yes</Radio>
										<Radio value={false}>No</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
						{this.state[FIELD_LICENSE_EVER_SUSPENDED] && (
							<Row>
								<Col md='12'>
									<Form.Item
										label='Please explain'
										name='explainLicenseSuspend'
										validateFirst={true}
										rules={[
											{
												required: this.state[FIELD_LICENSE_EVER_SUSPENDED],
												message: 'Please explain why suspended!',
											},
											{ whitespace: true, message: 'Invalid input!' },
											{ min: 10, message: 'Too short!' },
											{ max: 250, message: 'Too long!' },
										]}
									>
										<TextArea rows={2} placeholder='Explain...' />
									</Form.Item>
								</Col>
							</Row>
						)}
						<Row style={{ marginTop: '10px', marginBottom: '10px' }}>
							<Col md='4'>
								<Form.Item
									label='Salary Requirements'
									name='salary'
									rules={[{ required: true, message: 'Provide salary requirement!' }]}
								>
									<InputNumber
										style={{ width: '100%' }}
										min={1}
										step={100}
										placeholder='Salary requirement'
										formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									/>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Select Type'
									name='salaryType'
									rules={[{ whitespace: true, required: true, message: 'Select salary type!' }]}
								>
									<Select allowClear={true} placeholder='Select salary type'>
										{salaryTypes.map((type) => {
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
							<Col md='4'>
								<Form.Item
									label='Are you available to work'
									name='availableToWork'
									rules={[{ required: true, message: 'Select availability!' }]}
								>
									<CheckboxGroup
										options={['Full Time', 'Part Time', 'Per Diem']}
										value={this.state.checkedList}
										onChange={this.onChange}
									/>
								</Form.Item>
							</Col>
						</Row>
						{/* Specify days / hours you may be available */}
						<Label as='a' color='teal' ribbon>
							Specify days / hours you may be available
						</Label>
						<Row style={{ marginTop: '10px' }}>
							<Col md='12'>
								<WorkHourInput
									onWorkingHourChange={(workingHours) => this.setState({ workingHours })}
								/>
							</Col>
						</Row>
						<Row style={{ marginTop: '10px' }}>
							<Col md='3'>
								<Form.Item
									label='Do you have a current driver’s license?'
									name={FIELD_HAVE_CAR_LICENSE}
								>
									<Radio.Group
										onChange={(e) => this.setState({ [FIELD_HAVE_CAR_LICENSE]: e.target.value })}
									>
										<Radio value={true}>Yes</Radio>
										<Radio value={false}>No</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							{this.state[FIELD_HAVE_CAR_LICENSE] && (
								<>
									<Col md='4'>
										<Form.Item
											label='Select state'
											name='drivingLicenseIssuedState'
											rules={[
												{
													required: this.state[FIELD_HAVE_CAR_LICENSE],
													message: 'Select issued state!',
												},
												{ whitespace: true, message: 'Select issued state!' },
											]}
										>
											<Select showSearch allowClear={true} placeholder='Select issued state'>
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
									<Col md='5'>
										<Form.Item
											label='License'
											name='drivingLicense'
											validateFirst={true}
											rules={[
												{
													required: this.state[FIELD_HAVE_CAR_LICENSE],
													message: 'Provide license!',
												},
												{ whitespace: true, message: 'Invalid driving license!' },
												{ min: 5, message: 'Too short!' },
												{ max: 250, message: 'Too long!' },
											]}
										>
											<Input allowClear={true} placeholder='License' />
										</Form.Item>
									</Col>
								</>
							)}
						</Row>
					</Segment>
					<Row style={{ marginTop: 20 }}>
						<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<LeftCircleOutlined />}
								type='primary'
								htmlType='button'
								disabled={this.state.formProcessing || !this.props.prevTabId}
								onClick={() => this.props.goToPrevTab()}
							>
								Previous
							</Button>
						</Col>

						<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<CloseCircleOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginRight: 10 }}
								disabled={this.state.formProcessing}
								onClick={() => {
									this.setState({ ...formInitialValues })
									this.formRef.current.resetFields()
								}}
							>
								Clear All
							</Button>
							<Button
								icon={<SaveOutlined />}
								type='primary'
								htmlType='button'
								disabled={this.state.formProcessing}
								onClick={() => this.startProcessing(false)} // 'false' for not to leave
							>
								Save for Later
							</Button>
						</Col>

						<Col md='4' style={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<SaveOutlined />}
								type='primary'
								htmlType='button'
								disabled={this.state.formProcessing}
								onClick={() => this.startProcessing(true)} // 'true' for continue next
							>
								Save and Continue
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		)
	}
}

export default PersonalInfoForm
