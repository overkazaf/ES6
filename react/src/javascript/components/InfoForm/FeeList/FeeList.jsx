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
						<td>左口乡民宿3选1</td>
						<td>门市价¥850/晚</td>
						<td></td>
					</tr>
					<tr>
						<td>文渊狮城铂瑞酒店</td>
						<td>门市价¥2800/晚</td>
						<td>五星</td>
					</tr>
					<tr>
						<td>西南湖区（龙川湾）</td>
						<td>门市价¥160/人</td>
						<td></td>
					</tr>
					<tr>
						<td>九龙溪漂流 </td>
						<td>门市价¥110/人</td>
						<td></td>
					</tr>
					<tr>
						<td>文渊狮城度假区</td>
						<td>门市价¥100/人</td>
						<td></td>
					</tr>
					<tr>
						<td>古街景点门票（3选1）</td>
						<td>免费</td>
						<td></td>
					</tr>
				</table>
			</div>
		)
	}
}
