import React, {Component} from 'react';
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
	render () {
		let desc = JSON.stringify(this.state.data);
		console.log('desc', desc);
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