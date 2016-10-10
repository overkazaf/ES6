import React, {Component} from 'react';
import './DistServices.scss'


export default class DistServices extends Component {

	constructor (props) {
		super(props);
		this.state = this.props.info;
	}

	handleClick (type) {
		if (type in this.state) {
			let newState = {
				[type]: !this.state[type]
			};
			
			console.log('new State in DistServices::handleClick', newState);

			this.setState(newState, () => {
				this.props.handleServiceChange(this.state);
			});
		}
	}


	render () {

		let isGuideSelected = !!this.state.guide?'checked':'';
		let isCarSelected = !!this.state.car?'checked':'';
		let isPlainSelected = !!this.state.plain?'checked':'';
		let isEnsuranceSelected = !!this.state.ensurance?'checked':'';

		let handleClick = function (clickType) {
			this.handleClick(clickType);
		};

		return (
			<div className="m-dist-service hide">
			<div className="title">目的地服务</div>
			<table className="u-dist-service-table">
				<tr>
					<td><input type="checkbox" onClick={handleClick.bind(this, 'guide')} checked={isGuideSelected}/></td>
					<td>全程导游</td>
					<td></td>
					<td>￥300/天</td>
					<td></td>
				</tr>
				<tr>
					<td><input type="checkbox" onClick={handleClick.bind(this, 'car')} checked={isCarSelected}/></td>
					<td>全程用车</td>
					<td></td>
					<td>￥300/天</td>
					<td className="desc">别克GL8、奔驰商务</td>
				</tr>
				<tr>
					<td><input type="checkbox" onClick={handleClick.bind(this, 'plain')} checked={isPlainSelected}/></td>
					<td>接送机</td>
					<td></td>
					<td>￥80/人</td>
				</tr>
				<tr>
					<td><input type="checkbox" onClick={handleClick.bind(this, 'ensurance')} checked={isEnsuranceSelected}/></td>
					<td>旅游意外保险</td>
					<td></td>
					<td>￥5/天</td>
				</tr>
			</table>
			</div>
		)
	}
}
