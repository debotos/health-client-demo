import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { phoneTypes, relationshipTypes } from './index'
import { randomString } from '../../../utils/helpers'

const { Option } = Select

export class EmergencyContactAdd extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		this.props.onAddSuccess({ key: randomString(10), ...values })
		this.formRef.current.resetFields()
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
	}

	render() {
		return (
			<Form
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
				layout='vertical'
				ref={this.formRef}
				labelAlign='left'
			>
				<Form.Item
					label='Relationship Type'
					name='relationshipType'
					rules={[{ required: true, message: 'Select relationship type!' }]}
				>
					<Select allowClear={true} placeholder='Select Relationship type'>
						{relationshipTypes.map((type) => {
							const { key, person, value } = type
							return (
								<Option key={key} value={value}>
									{person}
								</Option>
							)
						})}
					</Select>
				</Form.Item>

				<Form.Item
					label='First'
					name='first'
					rules={[{ required: true, message: 'Provide first name!' }]}
				>
					<Input allowClear={true} placeholder='First name' />
				</Form.Item>

				<Form.Item
					label='Last'
					name='last'
					rules={[{ required: true, message: 'Provide last name!' }]}
				>
					<Input allowClear={true} placeholder='Last name' />
				</Form.Item>

				<Form.Item
					label='Phone Type'
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

				<Form.Item
					label='Phone Number'
					name='phoneNumber'
					rules={[{ required: true, message: 'Provide phone number!' }]}
				>
					<Input allowClear={true} placeholder='Phone number' />
				</Form.Item>

				<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
					<Button icon={<PlusOutlined />} onClick={this.handleAdd} type='primary' htmlType='submit'>
						Add
					</Button>
				</div>
			</Form>
		)
	}
}

export default EmergencyContactAdd
