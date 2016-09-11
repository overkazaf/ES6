import React, {Component} from 'react'
import CountDown from 'components/CountDown/CountDown'
import './GroupList.scss'

export default 
class GroupList extends Component {
	constructor (props) {
		super(props);
	}

	render () {

		let groupList = this.props.list.map(function (item, index){
			let isLeader = item.isLeader?'开团':'参团';
			return (
				<li className="group-member-list-item" key={index}>
					<span className="facebook">
						<i className="img"></i>
					</span>
					<span className="size">{item.size}人</span>
					<span className="start-time">{item.startTime}</span>
					<span className="is-leader">{isLeader}</span>
				</li>
			)
		});

		let st = this.props.startTime || new Date().getTime() - 3720; // test

		return (
			<div className="u-group-member-list">
				<ul className="group-member-list">
					{groupList}
				</ul>
			</div>
		)
	}
}

