import React, {Component} from 'react';
import Status from 'extend/status';
import './RouteDetailFooter.scss';


export default class RouteDetailFooter extends Component {
	constructor (props) {
		super(props);

		this.state = {
			status: this.props.status
		};
	};

	componentWillReceiveProps(nextProps) {
	 	if (nextProps) {
	 		if (typeof nextProps.status != 'undefined') {
	 			this.setState({
	 				status: nextProps.status
	 			}, () => {
	 				console.log('componentWillReceiveProps', this.state);
	 			});
	 		}
	 	}     
	}

	handleClick (handleType) {
		if (this.props.handleBuy) {
			this.props.handleBuy(handleType);
		}
	}

	showErrorMessage (msg) {
		if (this.props.showErrorMessage) {
			this.props.showErrorMessage(msg);
		}
	}

	render () {
		let footerBtns,
			that = this,
			{status} = this.state;
		// console.log("Status.getStatusCodes().SUCCESS", this.state);
		if (this.props.hasShareBtn) {
			if (status == Status.getStatusCodes().SUCCESS || status == Status.getStatusCodes().FAIL) {
				footerBtns = <div className="footer-buttons has-share">
								<div onClick={that.handleClick.bind(that, 'share')} className="btn-share">
									<span>分享给好友</span>
								</div>

								<div onClick={that.showErrorMessage.bind(that, '该拼团已经结束')} className="btn-buy-single disabled">
									<span>￥998/人</span>
									<span className="font-sm">我要参团</span>
								</div>

								<div onClick={that.handleClick.bind(that, 'group')} className="btn-buy-group">
									<span>去开团</span>
								</div>
							</div>
			} else {
				footerBtns = <div className="footer-buttons has-share">
								<div onClick={that.handleClick.bind(that, 'share')} className="btn-share">
									<span>分享给好友</span>
								</div>

								<div onClick={that.handleClick.bind(that, 'join')} className="btn-buy-single">
									<span>￥998/人</span>
									<span className="font-sm">我要参团</span>
								</div>

								<div onClick={that.handleClick.bind(that, 'group')} className="btn-buy-group">
									<span>去开团</span>
								</div>
							</div>
			}
			
		} else {
			
			footerBtns = <div className="footer-buttons">
							<a href="4001006560" className="btn-dial hide">
								<span>联系电话</span>
							</a>
							<div onClick={that.handleClick.bind(that, 'single')} className="btn-buy-single hide">
								<span>￥{that.props.singlePrice}起/人</span>
								<span className="font-sm">单独购买</span>
							</div>

							<div onClick={that.handleClick.bind(that, 'group')} className="btn-buy-group">
								<span>￥998起/人</span>
								<span className="font-sm">10人起团</span>
							</div>
						</div>
		}


		return (
			<div className="m-route-footer">
				{footerBtns}
			</div>
		)

	}

}