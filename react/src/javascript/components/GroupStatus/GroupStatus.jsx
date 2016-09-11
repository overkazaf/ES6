import React, {Component} from 'react'
import RouteItem from 'components/RouteItem/RouteItem';
import GroupCountDown from 'components/GroupCountDown/GroupCountDown';
import GroupList from 'components/GroupList/GroupList';
import './GroupStatus.scss'

export default 
class GroupStatus extends Component {
	constructor (props) {
		super(props);

		this.state = {
			status : this.props.status,
			groupSize: 15,
			list : this.props.list || [
				{url: 'aaa.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: true},
				{url: 'bbb.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ccc.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
				{url: 'jjj.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: false}
			],
			success : false
		};

		console.log('this.props.status', this.props.status);
	}

	calcRemainCounts (list) {
		let sum = 0;
		let range = 3;
		list.map(function (item){
			sum += parseInt(item.size);
		});

		return (this.state.groupSize-range) - sum;
	}

	render () {
		let {list, success} = this.state;
		let r = this.calcRemainCounts(list);
		let groupMessage = this.state.success ? '拼团成功，美好行程即将到来' : '还差<span className="remain-counts">' + r + '人,等你就像干柴需要烈火</span>';
		let bottomBtn;

		if (success) {
			bottomBtn = <section className="bottom-btn success">拼团成功,美好行程即将到来</section>;
		} else {
			bottomBtn = <section className="bottom-btn fail">再去开个团</section>;
		}

		return (
			<div className="m-group-status">
				<section className="status-block">
					<RouteItem />
				</section>

				<section className="status-block">
					<GroupCountDown 
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

