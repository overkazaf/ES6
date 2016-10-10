import React, {Component} from 'react';
import './GroupInfo.scss'


export default class GroupInfo extends Component {

	constructor (props) {
		super(props);
		this.state = this.props.info;
	}

	selectGroupSize (index) {
		if(!this.state.canSelect) return false;
		console.log('select group size ', index);

		this.setState({
			selectedGroupSizeIndex: index
		}, () => {
			this.props.handleGroupStateChange(this.state);
		})
	}

	selectOriginPlace (index) {
		if(!this.state.canSelect) return false;
		console.log('select origin place ', index);
		this.setState({
			selectedOriginPlaceIndex: index
		}, () => {
			this.props.handleGroupStateChange(this.state);
		})
	}

	selectLeaveDate (index) {
		if(!this.state.canSelect) return false;
		console.log('select leave date ', index);

		this.setState({
			selectedLeavedDateIndex: index
		}, () => {
			this.props.handleGroupStateChange(this.state);
		})
	}


	componentWillReceiveProps(nextProps) {
	      if (nextProps) {
	      	let info = nextProps.info;

	      	if (nextProps.info) {
		      	this.setState({
		      		canSelect: info.canSelect,
		      		selectedGroupSizeIndex: info.selectedGroupSizeIndex,
		      		selectedOriginPlaceIndex: info.selectedOriginPlaceIndex,
		      		selectedLeavedDateIndex: info.selectedLeavedDateIndex
		      	});
	      	}
	      	

	      	if (nextProps.canSelect) {
	      		this.setState({
	      			canSelect : nextProps.canSelect
	      		});
	      	}
	      } 
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

        let groupSizeClazz = this.props.isGroup ? 'row' : 'row hide';

		return (
			<div className="m-group-info">
				<div className={groupSizeClazz}>
				<div className="opt-header"><b className="title">开团人数</b><span className="ext-info">(成人人数)</span></div>
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
