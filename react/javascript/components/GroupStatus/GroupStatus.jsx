import React, {Component} from 'react';
import RouteItem from 'components/RouteItem/RouteItem';
import GroupCountDown from 'components/GroupCountDown/GroupCountDown';
import GroupList from 'components/GroupList/GroupList';
import Util from 'extend/util';
import Status from 'extend/status';
import './GroupStatus.scss';

export default 
class GroupStatus extends Component {
	constructor (props) {
		super(props);

		this.state = {
			status : this.props.status,
			groupSize: 15,
			routeItem : this.props.routeItem,
			list : this.props.list || [],
			remain: this.props.remain,
			endTime: new Date().getTime()
		};

	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps) {
	 		if (nextProps.routeItem) {
	 			this.setState({
		 			routeItem : nextProps.routeItem,
		 			remain: nextProps.routeItem.remain,
		 			startTime: nextProps.routeItem.groupStartTime
		 		}, () => {
		 			// console.log('update in group status', this.state);
		 		});
	 		}
	 		if (nextProps.remain) {
	 			this.setState({
		 			remain: nextProps.routeItem.remain
		 		}, () => {
		 			// console.log('update in group status', this.state);
		 		});
	 		}
	 	}

	 	
	}

	calcRemainCounts () {
		return this.state.remain || 0;
	}

	handleInfoChange (routeItemState) {
		
		let that = this;
		let groupInfoParam = {
			url: 'groupRecordInfo/getGroupRecordDetailByGroupId',
			method:'POST',
			data:{
				id: routeItemState.groupId
			},
			successFn: function (result){
				if (Util.isResultSuccessful(result)) {
					let groupList = that.buildGroupList(result.data);

					that.setState({
						list : groupList
					}, () => {
						// console.log('groupList has been updated');
					});
				}
			},
			errorFn: function () {
				console.error(arguments);
			}
		};

		this.setState({
			endTime: new Date(routeItemState.groupEndTime).getTime(),
			remain: routeItemState.remainAmount,
			status: routeItemState.status
		}, () => {
			// console.log('handleInfoChange   ', this.state);
			Util.fetchData(groupInfoParam);
		})
	}

	buildGroupList (data) {
		let groupList = data.map(function (item, index){
			// let arr = [];
			// for (let i = 0; i < item.normalNum; i++) {
			// 	arr.push({
			// 		url: item.userDTO.headImgURL,
			// 		size: item.normalNum, 
			// 		startTime: Util.formatTimestamp(item.payDate), 
			// 		isLeader: index == 0
			// 	});
			// }

			return {
				url: item.userDTO.headImgURL,
				size: item.normalNum, 
				startTime: Util.formatTimestamp(item.payDate), 
				isLeader: index == 0
			};
			//return arr;
		});

		return Util.flatten(groupList);
	}

	updateStatus (status) {
		this.setState({
			status: status
		});

		this.refs['groupCountDown'].updateStatus(status);
	}


	isGroupSuccessful () {
		return this.state.status == Status.getStatusCodes().SUCCESS;
	}

	render () {
		let {list, success, endTime, remain} = this.state;
		let r = this.calcRemainCounts();
		let groupMessage = this.isGroupSuccessful() ? '拼团成功，美好行程即将到来' : '还差<span className="remain-counts">' + r + '人,等你就像干柴需要烈火</span>';
		let bottomBtn;

		if (success) {
			bottomBtn = <section className="bottom-btn success">拼团成功,美好行程即将到来</section>;
		} else {
			bottomBtn = <section className="bottom-btn fail">再去开个团</section>;
		}

		endTime = new Date(endTime).getTime();

		//console.log('endTime', endTime);
		return (
			<div className="m-group-status">
				<section className="status-block">
					<RouteItem 
					handleInfoChange={this.handleInfoChange.bind(this)}
					info={this.state.routeItem}/>
				</section>

				<section className="status-block">
					<GroupCountDown
						ref="groupCountDown"
						status={status}
						remain={remain}
						endTime={endTime}
						list={list}
					/>
				</section>

				<section className="status-block">
					<GroupList 
						list={list}
					/>
				</section>

				{bottomBtn}
			</div>
		)
	}
}

