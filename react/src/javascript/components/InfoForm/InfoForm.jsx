import React, {Component} from 'react';
import GroupInfo from './GroupInfo';
import PersonInfo from './PersonInfo';
import FeeList from './FeeList';
import DistServices from './DistServices';
import ReadyPayInfo from './ReadyPayInfo';
import './InfoForm.scss';
import 'scss/base.scss';

export default class InfoForm extends Component {

	constructor (props) {
		super(props);
	}

	handleToPay () {

		if (this.validateForm()) {

		} else {
			// error
		}
	}


	validateForm () {
		return true;
	}

	reCalculatePrice () {
		
	}

	render () {
		let priceInfo = {
			valid : true,
			adult : '899.00',
			kid : '499.00'
		};

		return (
			<div className="m-fill-form">
				<section className="info-item">
					<GroupInfo />
					<PersonInfo onAmountChange={reCalculatePrice}/>
				</section>
				
				<section className="info-item">
					<FeeList />
				</section>
				
				<section className="info-item">
					<DistServices onSelect={reCalculatePrice} />
				</section>

				<ReadyPayInfo price={priceInfo} handleNextStep={handleToPay}/>
			</div>
		)
	}

}