import React, { Component } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Label, Segment } from 'semantic-ui-react'
import { Button, Modal, message } from 'antd'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import AddEducationInfo from './AddEducationInfo'
import EditEducationInfo from './EditEducationInfo'
import EducationInfoTable from './EducationInfoTable'

export class EducationInfoForm extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	startProcessing = (saveAndContinue = false) => {
		// 1. Education Validation
		if (this.state.educations.length === 0) {
			message.error('Please add education!')
			return
		}

		// TODO: Adjust fields(like convert all date fields from moment to string)
		// TODO: Implement mechanism to save
		if (saveAndContinue) {
			this.props.goToNextTab()
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			educationAddModal: false,
			educationEditModal: false,
			educationEditingData: null,
			educations: [],
		}
	}

	render() {
		return (
			<Container>
				<Segment raised>
					<Label as='a' color='teal' ribbon>
						Education
					</Label>
					<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							htmlType='button'
							style={{ marginBottom: 5 }}
							onClick={() => this.setState({ educationAddModal: true })}
						>
							Add
						</Button>
					</div>
					<EducationInfoTable
						data={this.state.educations}
						handleDelete={(key) => {
							const update = this.state.educations.filter((x) => x.key !== key)
							this.setState({ educations: update })
						}}
						onEdit={(educationData) => {
							this.setState({ educationEditingData: educationData }, () =>
								this.setState({ educationEditModal: true })
							)
						}}
					/>
					<Modal
						title='Add Education'
						visible={this.state.educationAddModal}
						footer={null}
						onCancel={() => this.setState({ educationAddModal: false })}
					>
						<AddEducationInfo
							onAddSuccess={(data) => {
								const { educations } = this.state
								this.setState({ educationAddModal: false, educations: [data, ...educations] })
							}}
						/>
					</Modal>
					<Modal
						destroyOnClose={true}
						title='Edit Education'
						visible={this.state.educationEditModal}
						footer={null}
						onCancel={() =>
							this.setState({ educationEditModal: false, educationEditingData: null })
						}
					>
						<EditEducationInfo
							onEditSuccess={(data) => {
								const { educations } = this.state
								const update = educations.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})
								this.setState({ educationEditModal: false, educations: update })
							}}
							data={this.state.educationEditingData}
						/>
					</Modal>
				</Segment>

				<Row style={{ marginTop: 20 }}>
					<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
						<Button
							icon={<LeftCircleOutlined />}
							type='primary'
							htmlType='button'
							disabled={!this.props.prevTabId}
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
							disabled={this.state.educations.length === 0}
							onClick={() => this.setState({ educations: [] })}
						>
							Clear All
						</Button>
						<Button
							icon={<SaveOutlined />}
							type='primary'
							htmlType='button'
							// disabled={this.state.educations.length === 0}
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
							// disabled={this.state.educations.length === 0}
							onClick={() => this.startProcessing(true)} // 'true' for continue next
						>
							Save and Continue
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default EducationInfoForm