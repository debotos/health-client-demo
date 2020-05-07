import React, { Component } from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'

import { Table, Thead, Tbody, Tr, Th, Td } from '../../ResponsiveTable'

const days = { su: false, mo: false, tu: false, we: false, th: false, fr: false, sa: false }
export const initialWorkingHourData = {
	'12:00AM': { time: '12:00AM', ...days },
	'01:00AM': { time: '01:00AM', ...days },
	'02:00AM': { time: '02:00AM', ...days },
	'03:00AM': { time: '03:00AM', ...days },
	'04:00AM': { time: '04:00AM', ...days },
	'05:00AM': { time: '05:00AM', ...days },
	'06:00AM': { time: '06:00AM', ...days },
	'07:00AM': { time: '07:00AM', ...days },
	'08:00AM': { time: '08:00AM', ...days },
	'09:00AM': { time: '09:00AM', ...days },
	'10:00AM': { time: '10:00AM', ...days },
	'11:00AM': { time: '11:00AM', ...days },
	'12:00PM': { time: '12:00PM', ...days },
	'01:00PM': { time: '01:00PM', ...days },
	'02:00PM': { time: '02:00PM', ...days },
	'03:00PM': { time: '03:00PM', ...days },
	'04:00PM': { time: '04:00PM', ...days },
	'05:00PM': { time: '05:00PM', ...days },
	'06:00PM': { time: '06:00PM', ...days },
	'07:00PM': { time: '07:00PM', ...days },
	'08:00PM': { time: '08:00PM', ...days },
	'09:00PM': { time: '09:00PM', ...days },
	'10:00PM': { time: '10:00PM', ...days },
	'11:00PM': { time: '11:00PM', ...days },
}

export class WorkHourInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: { ...initialWorkingHourData },
		}
	}
	render() {
		const { data } = this.state

		return (
			<Table>
				<Thead>
					<Tr>
						<Th>Time</Th>
						<Th style={{ textAlign: 'center' }}>Sunday</Th>
						<Th style={{ textAlign: 'center' }}>Monday</Th>
						<Th style={{ textAlign: 'center' }}>Tuesday</Th>
						<Th style={{ textAlign: 'center' }}>Wednesday</Th>
						<Th style={{ textAlign: 'center' }}>Thursday</Th>
						<Th style={{ textAlign: 'center' }}>Friday</Th>
						<Th style={{ textAlign: 'center' }}>Saturday</Th>
					</Tr>
				</Thead>
				<Tbody>
					{Object.keys(data).map((key) => {
						const currentItem = data[key]
						const { time, ...values } = currentItem
						return (
							<Tr key={key}>
								<Td>{time}</Td>
								{Object.keys(values).map((day) => {
									const isChecked = currentItem[day]
									return (
										<Td
											key={`${day}_${key}`}
											style={{ backgroundColor: isChecked ? '#9185ff7d' : '#fff' }}
										>
											<ClickableArea
												onClick={() => {
													currentItem[day] = !isChecked
													const updates = { ...data, [key]: { ...currentItem } }
													this.setState({ data: updates }, () =>
														this.props.onWorkingHourChange(updates)
													)
												}}
											>
												<Checkbox
													checked={values[day]}
													onChange={(e) => {
														currentItem[day] = e.target.checked
														const updates = { ...data, [key]: { ...currentItem } }
														this.setState({ data: updates }, () =>
															this.props.onWorkingHourChange(updates)
														)
													}}
												/>
											</ClickableArea>
										</Td>
									)
								})}
							</Tr>
						)
					})}
				</Tbody>
			</Table>
		)
	}
}

export default WorkHourInput

const ClickableArea = styled.div`
	cursor: pointer;
	height: 100%;
	width: 100%;
	text-align: center;
	@media screen and (max-width: 770px) {
		text-align: left;
	}
`
