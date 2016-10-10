import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'components/Tooltip/Tooltip';
import 'scss/base.scss';
import './ReadyPayInfo.scss';


export default class ReadyPayInfo extends Component {

	constructor (props) {
		super(props);
		this.state = {
			kid: '00.00',
			adult: '00.00',
			canSubmit: false
		};
	}

	handleNextStep () {
		if (this.props.handleNextStep) {
			this.props.handleNextStep();
		}
	}

	showErrorMessage () {
		if (this.props.showErrorMessage) {
			this.props.showErrorMessage();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.canSubmit != 'undefined') {
			//console.log('receieve canSubmit,' +  nextProps.canSubmit);
	    	this.setState({
	    		canSubmit: nextProps.canSubmit
	    	});
	    }

	    if (nextProps.price) {
	    	let price = nextProps.price;
	    	this.setState({
	    		kid: price.kid,
	    		adult: price.adult
	    	});
	    }
	}

	handleTooltip () {
		let tooltip = this.refs.tooltip;
		let table = `<table style="width:200px;">
						<tr><td style="text-align: left;vertical-align: top;">1、</td><td>出行人数为单人时，需要补足房费，费用由出行人分摊</td></tr>
						<tr><td style="text-align: left;vertical-align: top;">2、</td><td>儿童报价含早餐，不占床位</td></tr>
						</table>`;

		if (tooltip.state.shown) {
			tooltip.hide()
		} else {
			tooltip.setRefEl(this.refs.readyPayInfo, function () {
				tooltip.tooltip({
					tpl: table,
		 			direction: 'top',
		 			callback : function (){
		 			}
				});
			});
		}
	}

	render () {

		let nextStep;
		if (this.state.canSubmit) {
			nextStep = <div onClick={this.handleNextStep.bind(this)} className="next-step">下一步</div>;
		} else {
			nextStep = <div onClick={this.showErrorMessage.bind(this)} className="next-step disabled">下一步</div>
		}


		return (
			<div className="footer-fixed m-ready-pay-info">
				<div ref="readyPayInfo" className="ready-pay-info">
					<div className="price">
						<div onClick={this.handleTooltip.bind(this)} className="price-adult">
							<span className="price-tag">￥{this.state.adult}</span>
							<span> /成人</span>
						</div>
						<div className="price-child">
							<span className="price-tag">￥{this.state.kid}</span>
							<span> /儿童</span>
						</div>
					</div>
				</div>
				<Tooltip
					direction="top"
					ref="tooltip"/>
				{nextStep}
			</div>
		)
	}
}
