import React, {Component} from 'react'
import CountDown from 'components/CountDown/CountDown'
import Util from 'lib/util';
import './GroupList.scss'

export default 
class GroupList extends Component {
	constructor (props) {
		super(props);

		this.state = {
			list : this.props.list || []
		}
	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps && nextProps.list) {
	 		this.setState({
	 			list : nextProps.list
	 		});
	 	}     
	}

	componentDidMount() {
	 	setTimeout(function (){
	 		let $images = $('img');
		 	Util.lazyLoadImages($images, 10, 300); 
		 }, 500);     
	}

	render () {

		let groupList = this.state.list.map(function (item, index){
			let isLeader = item.isLeader?'开团':'参团';
			return (
				<li className="group-member-list-item" key={index}>
					<span className="facebook">
						<img width="100%" className="img" data-src={item.url}/>
					</span>
					<span className="size">{item.size}人</span>
					<span className="start-time">{item.startTime}</span>
					<span className="is-leader">{isLeader}</span>
				</li>
			)
		});

		return (
			<div className="u-group-member-list">
				<ul className="group-member-list">
					{groupList}
				</ul>
			</div>
		)
	}
}

