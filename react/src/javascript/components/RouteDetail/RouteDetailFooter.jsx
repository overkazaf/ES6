import React, {Component} from 'react';
import './RouteDetailFooter.scss'


export default class RouteDetailFooter extends Component {
	constructor (props) {
		super(props);
	};


	handleClick (handleType) {
		if (this.props.handleClick) {
			this.props.handleClick(handleType);
		}
	}

	render () {
		let footerBtns,
			that = this;

		if (this.props.hasShareBtn) {
			footerBtns = (function (){
				return (
					<div className="footer-buttons has-share">
						<div onClick={that.handleClick.bind(that, 'share')} className="btn-share">
							<span>分享给好友</span>
						</div>

						<div onClick={that.handleClick.bind(that, 'single')} className="btn-buy-single">
							<span>￥899/人</span>
							<span className="font-sm">我要参团</span>
						</div>

						<div onClick={that.handleClick.bind(that, 'group')} className="btn-buy-group">
							<span>去开团</span>
						</div>
					</div>
				)
			})();
		} else {
			footerBtns = (function (){
				return (
					<div className="footer-buttons">
						<div onClick={that.handleClick.bind(that, 'single')} className="btn-buy-single">
							<span>￥1550起/人</span>
							<span className="font-sm">单独购买</span>
						</div>

						<div onClick={that.handleClick.bind(that, 'group')} className="btn-buy-group">
							<span>￥899起/人</span>
							<span className="font-sm">10人起团</span>
						</div>
					</div>
				)
			})();
		}


		return (
			<div className="m-route-footer">
				{footerBtns}
			</div>
		)

	}

}