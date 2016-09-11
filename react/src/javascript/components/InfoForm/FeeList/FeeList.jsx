import React, {Component} from 'react';
import './FeeList.scss'


export default class FeeList extends Component {

	constructor (props) {
		super(props);
	}


	render () {
		return (
			<div className="m-fee-list">
				<div className="title">费用清单</div>
				<table className="u-fee-table">
					<tr>
						<td>蓝马驿站</td>
						<td>湖景房</td>
						<td>￥300/晚X1晚</td>
					</tr>
					<tr>
						<td>铂瑞酒店</td>
						<td>湖景房</td>
						<td>￥300/晚X1晚</td>
					</tr>
					<tr>
						<td>九龙溪漂流</td>
						<td></td>
						<td>￥80/人</td>
					</tr>
					<tr>
						<td>进湾水上乐园</td>
						<td></td>
						<td>￥80/人</td>
					</tr>
					<tr>
						<td>千岛湖大桥</td>
						<td></td>
						<td>￥80/人</td>
					</tr>
				</table>
			</div>
		)
	}
}
