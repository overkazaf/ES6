import React, {Component} from 'react';
import './GroupInfo.scss'


export default class GroupInfo extends Component {

	constructor (props) {
		super(props);


		this.state = {
			groupSizes: ['6-9人', '10-12人', '12-15人'],
			originPlaces: ['杭州', '上海', '南京'],
			leavedDates: ['9月30日', '10月2日', '10月3日'],

			selectedGroupSizeIndex: 1,
			selectedOriginPlaceIndex: 0,
			selectedLeavedDateIndex: 0,

			leaveDays: 3
		};
	}

	selectGroupSize (index) {
		console.log('select group size ', index);

		this.setState({
			selectedGroupSizeIndex: index
		})
	}

	selectOriginPlace (index) {
		console.log('select origin place ', index);
		this.setState({
			selectedOriginPlaceIndex: index
		})
	}

	selectLeaveDate (index) {
		console.log('select leave date ', index);

		this.setState({
			selectedLeavedDateIndex: index
		})
	}


	render () {

		let that = this;
		let optListItem = this.state.groupSizes.map(function (item, index){
			const clazzName = (that.state.selectedGroupSizeIndex == index) ? "opt-list-item active" : "opt-list-item";
			return (
				<li key={index} className={clazzName} onClick={that.selectGroupSize.bind(that, index)}>{item}</li>
			)
		});


		let placeListItem = this.state.originPlaces.map(function (item, index) {
			const clazzName = (that.state.selectedOriginPlaceIndex == index) ? "opt-list-item active" : "opt-list-item";
			return (
				<li key={index} className={clazzName} onClick={that.selectOriginPlace.bind(that, index)}>{item}</li>
			)
		});

		let leaveDateListItem = this.state.leavedDates.map(function (item, index) {
			const clazzName = (that.state.selectedLeavedDateIndex == index) ? "opt-list-item active" : "opt-list-item";
			return (
				<li key={index} className={clazzName} onClick={that.selectLeaveDate.bind(that, index)}>{item}</li>
			)
		});


		return (
			<div className="m-group-info">
				<div className="row">
				<div className="opt-header"><b className="title">开团人数</b><span className="ext-info">成人人数</span></div>
					<ul className="opt-list">
						{optListItem}
					</ul>
				</div>
				<div className="row">
				<div className="opt-header"><b className="title">出发地</b></div>
					<ul className="opt-list">
						{placeListItem}
					</ul>
				</div>

				<div className="row">
				<div className="opt-header"><b className="title">出发日期</b></div>
					<ul className="opt-list">
						{leaveDateListItem}
					</ul>
				</div>

				<div className="row">
				<div className="opt-header"><b className="title">出行天数</b></div>
					<div className="leave-days">3天</div>
				</div>
			</div>
		)
	}
}
