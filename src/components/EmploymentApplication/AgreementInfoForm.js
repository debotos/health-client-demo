import React, { Component } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Label, Segment } from 'semantic-ui-react'
import { Button, Checkbox, Form, Input, DatePicker, message } from 'antd'
import moment from 'moment'
import { StepForwardOutlined } from '@ant-design/icons'
import { clone } from 'ramda'

export class AgreementInfoForm extends Component {
	onFinish = (values) => {
		// this.formRef.current.resetFields()
		const { tabs, id, formValues } = this.props
		const finalValues = { [id]: values, ...clone(formValues) }
		console.log('Final values =>', finalValues)
		const tabIds = tabs.map((x) => x.id)
		const sectionIds = Object.keys(finalValues)
		if (!tabIds.every((id) => sectionIds.includes(id))) {
			message.error('Missing required form fields!')
			return
		}
		// TODO: Adust and send it to backend via AJAX call
		this.props.onSuccessfulSubmit()
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
		this.state = { accepted: false }
	}

	render() {
		const { accepted } = this.state
		return (
			<Container>
				<Segment raised>
					<Label as='a' color='teal' ribbon>
						Agreement
					</Label>
					<div style={{ margin: '10px 0 25px 0' }}>
						<p style={{ textAlign: 'justify' }}>
							I understand, agree, and acknowledge that any employment relationship that may result
							from this application will be of an at-will nature only, which means that I may resign
							at any time and for any reason and that the company may terminate my employment at any
							time and for any reason with or without cause. I also understand, agree, and
							acknowledge that no employee of the company has any authority whatsoever to make any
							promises or arrangements with me that changes the at-will nature of any employment
							relationship that may result between me and the company.
						</p>

						<p>
							In the event of my potential employment, I understand, agree, and acknowledge that:
						</p>

						<ol>
							<li>
								Any false, omitted, or misleading information provided by me either in my resume, on
								this job application form, or in interviews may result in my discharge at any time
								in the future;
							</li>
							<li>
								I am required to abide by all personnel policies, rules, and regulations of the
								company if I am hired;
							</li>
							<li>
								I authorize the investigation of all statements by the company and/or its agents
								contained in this application, my resume, or made during any interview as may be
								necessary in arriving at an employment decision with respect to my application.;
							</li>
							<li>
								This application shall be considered active for a period of time not to exceed six
								months, and should I wish to be considered for employment beyond this time period I
								agree to submit an additional application in the future;
							</li>
							<li>
								I consent to a pre-employment drug screen and criminal background check and I
								acknowledge that if at any time the company learns that the drug screen yields a
								positive result, the company may withdraw and revoke any offer of employment; and
							</li>
							<li>
								I certify that all answers and information given herein are true and complete to the
								best of my knowledge.
							</li>
						</ol>
					</div>

					<Checkbox
						checked={accepted}
						onChange={(e) => this.setState({ accepted: e.target.checked })}
					>
						I agree to the terms above.
					</Checkbox>

					<Form
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						layout='vertical'
						ref={this.formRef}
						labelAlign='left'
						initialValues={{ date: moment() }}
					>
						<Row style={{ marginTop: '15px' }}>
							<Col md='4'>
								<Form.Item
									label='Applicant Signature'
									name='signature'
									rules={[
										{ whitespace: true, required: true, message: 'Provide signature!' },
										{ min: 2, message: 'Too short!' },
										{ max: 100, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Signature' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Date'
									name='date'
									rules={[{ required: true, message: 'Select date!' }]}
								>
									<DatePicker
										allowClear={true}
										placeholder='Select date'
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						</Row>
						<div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
							<Button
								icon={<StepForwardOutlined />}
								type='primary'
								htmlType='submit'
								disabled={!accepted}
							>
								Submit
							</Button>
						</div>
					</Form>
				</Segment>
			</Container>
		)
	}
}

export default AgreementInfoForm
