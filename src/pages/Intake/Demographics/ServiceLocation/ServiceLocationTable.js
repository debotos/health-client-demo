import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'

export class ServiceLocationTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Street',
				dataIndex: 'street',
				key: 'street',
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
				title: 'Zip Code',
				dataIndex: 'zip',
				key: 'zip',
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

export default ServiceLocationTable
