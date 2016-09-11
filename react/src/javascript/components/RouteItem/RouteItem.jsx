import React, {Component} from 'react'
import 'scss/base.scss'
import './RouteItem.scss'

export default class RouteItem extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		let defaultObj = {
			name:'千岛湖国庆家庭主题3日游',
			startDate:'2016.09.30',
			groupMembers: {
				adults : 2,
				kids : 1,
			},
			sourcePlace:'杭州',
			price:'2099.00',
			status: 1 // 0为拼团成功， 1为拼团中， 2为拼团失败
		};

		let {
			name,
			startDate,
			groupMembers,
			sourcePlace,
			price,
			status
		} = defaultObj;

		let statusText = (status == 1) ? '拼团中' : '';
		let statusDiv;

		if (status == 1) {
			// 拼团中的状态，只显示文字
			statusDiv = (<div className="item-status-text">拼团中</div>);
		} else {
			if (status == 0) {
				// 拼团成功
				statusDiv = (<div className="item-seal success"></div>);
			} else {
				statusDiv = (<div className="item-seal fail"></div>);
			}
		}

		return (
			<div className="u-route-item">
				<div className="column">
					<img className="item-image" src={this.props.src} />
				</div>
				<div className="column item-detail">
					<h2 className="item-name">{name}</h2>
					<div className="item-desc">
						出行日期：
						<span className="item-start-date">{startDate}</span>
					</div>
					<div className="item-desc">
						出行人数：
						<span className="item-group-members">
							<i>成人{groupMembers.adults}</i>
							<i>儿童{groupMembers.kids}</i>
						</span>
					</div>
					<div className="item-desc">
						出发地：
						<span className="item-source-place">{sourcePlace}</span>
					</div>
					<b className="item-price">
						￥{price} <i>/人</i></b>

					{statusDiv}
				</div>
			</div>
		)
	}
}