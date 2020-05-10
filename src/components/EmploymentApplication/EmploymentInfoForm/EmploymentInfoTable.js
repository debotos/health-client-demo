import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'
import moment from 'moment'

export class EmploymentInfoTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Employer',
				dataIndex: 'employer',
				key: 'employer',
			},
			{
				title: 'City',
				dataIndex: 'city',
				key: 'city',
			},
			{
				title: 'State',
				dataIndex: 'state',
				key: 'state',
			},
			{
				title: 'Position Held',
				dataIndex: 'positionHeld',
				key: 'positionHeld',
			},
			{
				title: 'Phone',
				dataIndex: 'supervisorPhoneNumber',
				key: 'supervisorPhoneNumber',
			},
			{
				title: 'Start Date',
				dataIndex: 'startDate',
				key: 'startDate',
				render: (value, record) => moment(value).format('MM/DD/YYYY'),
			},
			{
				title: 'End Date',
				dataIndex: 'endDate',
				key: 'endDate',
				render: (value, record) => moment(value).format('MM/DD/YYYY'),
			},
			{
				title: 'Actions',
				dataIndex: 'action',
				width: '100px',
				render: (text, record) => (
					<>
						<span
							style={{ color: 'teal', cursor: 'pointer', marginRight: '5px' }}
							onClick={() => this.props.onEdit(record)}
						>
							Edit
						</span>
						<Popconfirm
							title='Sure to delete?'
							onConfirm={() => this.props.handleDelete(record.key)}
						>
							<span style={{ color: 'tomato', cursor: 'pointer' }}>Delete</span>
						</Popconfirm>
					</>
				),
			},
		]
	}
	render() {
		const { data } = this.props
		// console.log(data)
		return (
			<Table bordered size='small' pagination={false} columns={this.columns} dataSource={data} />
		)
	}
}

export default EmploymentInfoTable
