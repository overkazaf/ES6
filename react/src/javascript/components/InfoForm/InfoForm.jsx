import React, {Component} from 'react';
import GroupInfo from './GroupInfo';
import PersonInfo from './PersonInfo';
import FeeList from './FeeList';
import DistServices from './DistServices';
import ReadyPayInfo from './ReadyPayInfo';
import Notification from 'components/Notification/Notification';
import './InfoForm.scss';
import 'scss/base.scss';

export default class InfoForm extends Component {

	constructor (props) {
		super(props);

		this.state = {
			info: {
				groupSize: 1, // 0:6-9人, 1:10-12人, 2:12-15人
				originPlace: 'hz', // hz:杭州, sh:上海, nj:南京
				leaveDate: '0930', // 0930, 1002, 1003
				leaveDays: 3,
				personInfo: {
					adult : {
						count: 1,
						main: {
							name: '',
							id: '',
							phone: ''
						},
						extra: []
					},
					kid: {
						count: 1
					}
				}
			},
			enter: false,
			message: ''
		}
	}


	validateForm () {
		return true;
	}

	handleMemberAmountChange (state) {
		// 1. fixed person numberCount
		console.log('handleMemberAmountChange::state', state);
		console.log('handleMemberAmountChange::personInfo', this.state.personInfo);

		this.setState({
			personInfo : state
		}, () => {
			// 2. recal price
			this.reCalculatePrice();
		});
		
	}

	reCalculatePrice () {
		console.log('re calculate');
	}

	handleToPay () {
		this.setState({
			enter: true,
			message: '准备支付'
		});
	}

	/**
	 * [enter 负责通知组件的显示]
	 * @Author   JohnNong
	 * @Email    overkazaf@gmail.com
	 * @Github   https://github.com/overkazaf
	 * @DateTime 2016-09-09T11:20:51+0800
	 * @return   {[type]}                     [description]
	 */
	enter () {
		this.setState({
			enter: true
		})
	}

	leave() {
		this.setState({
		  enter: false
		});
	}

	render () {
		let that = this;

		let priceInfo = {
			valid : true,
			adult : '899.00',
			kid : '499.00'
		};

		let personInfo = this.state.personInfo;
		console.log('personInfo in render', personInfo);

		let reCalculatePrice = function () {
			that.reCalculatePrice();
		};

		let handleToPay = function () {
			that.handleToPay();
		}

		let handleMemberAmountChange = function (state) {
			that.handleMemberAmountChange(state);
		};


		return (
			<div className="m-fill-form">
				<section className="info-item">
					<GroupInfo />
					<PersonInfo
					 personInfo={personInfo}
					 handleMemberAmountChange={handleMemberAmountChange}/>
				</section>
				
				<section className="info-item">
					<FeeList />
				</section>
				
				<section className="info-item">
					<DistServices onSelect={reCalculatePrice} />
				</section>

				<ReadyPayInfo price={priceInfo} handleNextStep={handleToPay}/>

				<Notification enter={this.state.enter} leave={this.leave.bind(this)}>{this.state.message}</Notification>
			</div>
		)
	}

}