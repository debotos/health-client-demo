import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Form, Button, Modal, message } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import ReferralSourceTable from './ReferralSource/ReferralSourceTable'
import AddReferralSource from './ReferralSource/AddReferralSource'
import EditReferralSource from './ReferralSource/EditReferralSource'
import Btn from '../../../components/UI/Button'

export class Referral extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({ referrals: [] })
		this.formRef.current.resetFields()
	}

	startProcessing = (saveAndContinue = false) => {
		const { referrals } = this.state
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)

		// 1. Referral Validation
		if (referrals.length === 0) {
			message.error('Please add referral!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				console.log('Success:', { ...values, referrals })
				this.mounted && this.setState({ formProcessing: false })
				// TODO: Adjust fields(like convert all date fields from moment to string)
				// TODO: Implement mechanism to save
				if (saveAndContinue) {
					const data = { referrals, ...values }
					this.props.goToNextTab(data)
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
			referralAddModal: false,
			referralEditModal: false,
			referrals: [],
			caseManagers: [],
			referralEditingData: null,
		}
	}

	render() {
		return (
			<>
				<Form
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
					labelAlign='left'
				>
					{/* Referral Source */}
					<Segment>
						<h3 className='title'>Referral Source</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ referralAddModal: true })}
							>
								Add
							</Button>
						</div>
						<ReferralSourceTable
							data={this.state.referrals}
							handleDelete={(key) => {
								const update = this.state.referrals.filter((x) => x.key !== key)
								this.setState({ referrals: update })
							}}
							onEdit={(referralData) => {
								this.setState({ referralEditingData: referralData }, () =>
									this.setState({ referralEditModal: true })
								)
							}}
							/* To Handle Case Managers */
							caseManagers={this.state.caseManagers}
							setCaseManagers={(caseManagers) => this.setState({ caseManagers })}
							deleteCaseManager={(key) => {
								const update = this.state.caseManagers.filter((x) => x.key !== key)
								this.setState({ caseManagers: update })
							}}
							updateCaseManager={(data) => {
								const update = this.state.caseManagers.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})

								this.setState({ caseManagers: update })
							}}
						/>
						<Modal
							title='New Referral'
							visible={this.state.referralAddModal}
							footer={null}
							onCancel={() => this.setState({ referralAddModal: false })}
						>
							<AddReferralSource
								onAddSuccess={(data) => {
									const { referrals } = this.state
									this.setState({ referralAddModal: false, referrals: [data, ...referrals] })
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Referral'
							visible={this.state.referralEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ referralEditModal: false, referralEditingData: null })
							}
						>
							<EditReferralSource
								onEditSuccess={(data) => {
									const { referrals } = this.state
									const update = referrals.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ referralEditModal: false, referrals: update })
								}}
								data={this.state.referralEditingData}
							/>
						</Modal>
					</Segment>

					<Row style={{ marginTop: 20 }}>
						<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
							<Btn
								icon={<LeftCircleOutlined />}
								htmlType='button'
								disabled={this.state.formProcessing || !this.props.prevTabId}
								onClick={() => this.props.goToPrevTab()}
							>
								Previous
							</Btn>
						</Col>

						<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
							<Btn
								icon={<CloseCircleOutlined />}
								htmlType='button'
								style={{ marginRight: 10 }}
								disabled={this.state.formProcessing}
								onClick={this.handleClearAll}
							>
								Clear All
							</Btn>
							<Btn
								icon={<SaveOutlined />}
								htmlType='button'
								disabled={this.state.formProcessing}
								onClick={() => this.startProcessing(false)} // 'false' for not to leave
							>
								Save for Later
							</Btn>
						</Col>

						<Col md='4' style={{ display: 'flex', justifyContent: 'center' }}>
							<Btn
								icon={<SaveOutlined />}
								htmlType='button'
								disabled={this.state.formProcessing}
								onClick={() => this.startProcessing(true)} // 'true' for continue next
							>
								Save and Continue
							</Btn>
						</Col>
					</Row>
				</Form>
			</>
		)
	}
}

export default Referral
