import React, { Component } from 'react'
import { Label, Segment } from 'semantic-ui-react'
import { Select } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'

const { Option } = Select
const types = [
	{ key: 1, title: 'RN', value: 'RN' },
	{ key: 2, title: 'LPN', value: 'LPN' },
	{ key: 3, title: 'PT', value: 'PT' },
	{ key: 4, title: 'PTA', value: 'PTA' },
]

export class PersonalInfoForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: '',
		}
	}
	render() {
		return (
			<div>
				<Segment raised>
					<Label as='a' color='teal' ribbon>
						Position Applying for
					</Label>

					<Row style={{ marginTop: '10px' }}>
						<Col md='4'>
							<Select
								style={{ width: '100%', margin: '5px 0' }}
								onChange={(value) => this.setState({ type: value })}
							>
								{types.map((type) => {
									const { key, title, value } = type
									return (
										<Option key={key} value={value}>
											{title}
										</Option>
									)
								})}
							</Select>
						</Col>
						<Col md='4'>
							<Select
								style={{ width: '100%', margin: '5px 0' }}
								onChange={(value) => this.setState({ type: value })}
							>
								{types.map((type) => {
									const { key, title, value } = type
									return (
										<Option key={key} value={value}>
											{title}
										</Option>
									)
								})}
							</Select>
						</Col>
						<Col md='4'>
							<Select
								style={{ width: '100%', margin: '5px 0' }}
								onChange={(value) => this.setState({ type: value })}
							>
								{types.map((type) => {
									const { key, title, value } = type
									return (
										<Option key={key} value={value}>
											{title}
										</Option>
									)
								})}
							</Select>
						</Col>
						<Col md='4'>
							<Select
								style={{ width: '100%', margin: '5px 0' }}
								onChange={(value) => this.setState({ type: value })}
							>
								{types.map((type) => {
									const { key, title, value } = type
									return (
										<Option key={key} value={value}>
											{title}
										</Option>
									)
								})}
							</Select>
						</Col>
					</Row>
				</Segment>
			</div>
		)
	}
}

export default PersonalInfoForm
