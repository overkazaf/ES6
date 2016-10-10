import React, {Component} from 'react'
import CountDown from 'components/CountDown/CountDown'
import Util from 'lib/util.jsx'
import './GroupCountDown.scss'

export default 
class GroupCountDown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			status: this.props.status,
			startTime: this.props.startTime,
			remain: this.props.remain
		};
	}

	componentWillReceiveProps(nextProps) {
	 //console.log('componentWillReceiveProps in GroupCountDown', nextProps);
	 if (nextProps) {
	 	if (nextProps.endTime) {
	 		this.setState({
		 		endTime: nextProps.endTime
		 	})
	 	}

	 	if (nextProps.remain) {
	 		this.setState({
		 		remain: nextProps.remain
		 	})
	 	}

	 	if (typeof nextProps.status != 'undefined') {
	 		this.setState({
	 			status: nextProps.status
	 		});
	 	}
	 }
	}

	updateStatus (status) {
		let that = this;
		this.setState({
			status: status
		});
		
		setTimeout(function (){
			that.refs['countDown'].updateStatus(status);
		}, 50);
	}

	updateEndTime (endTime) {
		this.setState({
			endTime: endTime
		});

		this.refs['countDown'].updateEndTime(endTime);
	}

	updateRemain (remain) {
		this.setState({
			remain: remain
		});

		this.refs['countDown'].updateRemain(remain);
	}

	render () {
		let {endTime, remain, status} = this.state;

		let groupList = this.props.list.map(function (item, index){
			let tplArray = [];
			
			if (item.size > 0) {
				let buildItem = function (i){
					let keyIndex = index + '-' + i;
					return (
						<li className="group-list-item" key={keyIndex}>
							<img width="104%" src={item.url} />
						</li>
					)
				};
				for (let i = 0; i < item.size; i++) {
					tplArray.push(buildItem(i));
				}				
			}

			return tplArray;
		});

		groupList = Util.flatten(groupList);

		// 修正长度
		let isOverflow = groupList.length > 13;
		groupList = isOverflow ? groupList.slice(0, 13) : groupList;
		if (isOverflow) {
			groupList.push((function (){
				let dotsLink = 'http://yougo.xinguang.com/fightgroup-web/public/res/imgs/dots@3x.png';
				return (
						<li className="group-list-item dot" key="index-13">
							<img width="70%" src={dotsLink} />
						</li>
					)
			})());
		}

		return (
			<div className="u-group-count-down">
				<ul className="group-list">
					{groupList}
				</ul>

				<div className="u-count-down">
					<CountDown 
						ref="countDown"
						status={status}
						remain={remain}
						endTime={endTime} />
				</div>
			</div>
		)
	}
}

