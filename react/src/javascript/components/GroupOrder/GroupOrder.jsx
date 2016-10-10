import React, {Component} from 'react'
import RouteItem from 'components/RouteItem/RouteItem';
import GroupCountDown from 'components/GroupCountDown/GroupCountDown';
import GroupList from 'components/GroupList/GroupList';
import './GroupOrder.scss'

export default 
class GroupOrder extends Component {
	constructor (props) {
		super(props);

		this.state = {
			groupSize: 15,
			list : this.props.list || [],
			success : true
		}
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
		let list = this.state.list;
		let r = this.calcRemainCounts(list);
		let groupMessage = this.state.success ? '拼团成功，美好行程即将到来' : '还差<span className="remain-counts">' + r + '人,等你就像干柴需要烈火</span>';
		
		return (
			<div className="m-group-status">
				<section>
					<RouteItem />
				</section>

				<section>
					<GroupCountDown 
						list={list}
					/>
				</section>

				<section>
					<GroupList 
						list={list}
					/>
				</section>


			</div>
		)
	}
}

