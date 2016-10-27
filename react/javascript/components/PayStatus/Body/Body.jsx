import React, {Component} from 'react';
import Util from 'extend/util';
import './Body.scss';

export default class Body extends Component {
	constructor (props) {
		super(props);

		this.state = {
			data: this.props.info
		};
	}

	componentWillReceiveProps(nextProps) {
	    if (nextProps.info) {
	    	this.setState({
	    		data: nextProps.info
	    	});
	    }
	}

	render () {
		let data = this.state.data;
		return (
			<div className="m-body">
				<RouteDesc info={data}/>
				<RouteHint />
			</div>
		)
	}
}

class RouteDesc extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: this.props.info
		};
	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps.info) {
	 		this.setState({
	 			data: nextProps.info
	 		});
	 	}     
	}

	buildRouteDesc (data) {
		let desc;
		let that = this;
		if (data) {
			let infoData = data.data;
			desc = (function (info) {
				let description = info.description || '路线描述';
				let detail = Util.rebuildItemState(info);
				let infoTable = that.buildInfoTable(detail);
				let price = detail.price;
				return (
					<div className="desc">
						<h1 className="route-title">{detail.name}</h1>
						<p className="route-summary">{description}</p>
						<div className="route-info">
							{infoTable}
						</div>
						<div className="price">
							<div className="price-label">
								<span>支付总价</span>
								<span className="price-sign">￥</span>
								<span className="price-value">{price}</span>
							</div>
						</div>
					</div>
				)
			})(infoData);
		}

		return desc;
	}

	buildInfoTable (data) {
		let startDate = data.groupStartTime.split(' ')[0];
		return (
			<div className="info-table">
				<div className="row">
					<span className="row-label">出行日期:</span>
					<span>
						{startDate}
					</span>
				</div>
				<div className="row">
					<span className="row-label">出行人数:</span>
					<span> 成人{data.adult}</span>
					<span> 儿童{data.kid}</span>
				</div>
				<div className="row">
					<span className="row-label">出发地:</span>
					<span>
						{data.travelAddress}
					</span>
				</div>
			</div>
		);
	}

	render () {
		let desc = this.buildRouteDesc(this.state.data);
		return (
			<div className="u-route-desc">
				{desc}
			</div>
		)
	}
}

class RouteHint extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="u-route-hint">
				<h2 className="title">温馨提示:</h2>
				<p className="desc">
					您可以在30分钟内取消订单，超过时效将无法取消。订单失效后，平台客服会与您联系，确认出行信息。
				</p>
				<p className="desc">
					平台客服电话400-010-6560
				</p>
			</div>
		)
	}
}