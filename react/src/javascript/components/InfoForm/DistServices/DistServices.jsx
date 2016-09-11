import React, {Component} from 'react';
import './DistServices.scss'


export default class DistServices extends Component {

	constructor (props) {
		super(props);
	}

	onSelect () {

	}


	render () {

		return (
			<div className="m-dist-service">
			<div className="title">目的地服务</div>			
			<table className="u-dist-service-table">
				<tr>
					<td><input type="radio" checked/></td>
					<td>全程导游</td>
					<td></td>
					<td>￥300/天</td>
					<td></td>
				</tr>
				<tr>
					<td><input type="radio" /></td>
					<td>全程用车</td>
					<td></td>
					<td>￥300/天</td>
					<td className="desc">别克GL8、奔驰商务</td>
				</tr>
				<tr>
					<td><input type="radio" checked/></td>
					<td>接送机</td>
					<td></td>
					<td>￥80/人</td>
				</tr>
				<tr>
					<td><input type="radio" checked/></td>
					<td>旅游意外保险</td>
					<td></td>
					<td>￥5/天</td>
				</tr>
			</table>
			</div>
		)
	}
}
