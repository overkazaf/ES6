import React, {Component} from 'react';
import './ReadyPayInfo.scss'


export default class ReadyPayInfo extends Component {

	constructor (props) {
		super(props);
	}

	handleNextStep () {
		if (this.props.handleNextStep) {
			this.props.handleNextStep();
		}
	}


	render () {
		return (
			<div className="m-ready-pay-info">
				<div className="ready-pay-info">
					<div className="price">
						<div className="price-adult">
							<span className="price-tag">￥899.00</span>
							<span> /成人</span>
						</div>
						<div className="price-child">
							<span className="price-tag">￥499.00</span>
							<span> /儿童</span>
						</div>
					</div>
				</div>
				<div onClick={handleNextStep} className="next-step">下一步</div>
			</div>
		)
	}
}
