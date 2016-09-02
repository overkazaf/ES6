import React, {Component} from 'react';
import './RouteDetailFooter.scss'


export default class RouteDetailFooter extends Component {
	constructor (props) {
		super(props);
	};


	handleBuy (buyType) {
		if (this.props.handleBuy) {
			this.props.handleBuy(buyType);
		}
	}

	render () {
		return (
			<div className="m-route-footer">
				<div className="footer-buttons">
					<div onClick={this.handleBuy.bind(this, 'single')} className="btn-buy-single">
						<span>￥1550起/人</span>
						<span className="font-sm">单独购买</span>
					</div>

					<div onClick={this.handleBuy.bind(this, 'group')} className="btn-buy-group">
						<span>￥899起/人</span>
						<span className="font-sm">10人起团</span>
					</div>
				</div>
			</div>
		)

	}

}