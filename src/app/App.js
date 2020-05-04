import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'
import { Tabs, Select, Button } from 'antd'
import { Button as Btn } from 'semantic-ui-react'

import './App.scss'
import Header from '../components/common/Header'

const { TabPane } = Tabs
const { Option } = Select

class App extends Component {
	render() {
		return (
			<>
				<Header />
				<Progress style={{ margin: '0 20px' }} progress='percent' percent={50} success size='small'>
					The progress was successful
				</Progress>
				<Button type='primary'>Button</Button>
				<Btn primary>Button</Btn>
				<div style={{ margin: '20px 15px' }}>
					<Tabs tabPosition={'left'}>
						<TabPane tab='Tab 1' key='1'>
							Content of Tab 1
						</TabPane>
						<TabPane tab='Tab 2' key='2'>
							Content of Tab 2
						</TabPane>
						<TabPane tab='Tab 3' key='3'>
							Content of Tab 3
						</TabPane>
					</Tabs>
				</div>
			</>
		)
	}
}

export default App
