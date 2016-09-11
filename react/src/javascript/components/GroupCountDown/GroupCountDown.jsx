import React, {Component} from 'react'
import CountDown from 'components/CountDown/CountDown'
import Util from 'lib/util.jsx'
import './GroupCountDown.scss'

export default 
class GroupCountDown extends Component {
	constructor (props) {
		super(props);
	}

	render () {

		let groupList = this.props.list.map(function (item, index){
			let tplArray = [];
			
			if (item.size > 0) {
				let buildItem = function (i){
					let keyIndex = index + '-' + i;
					return (
						<li className="group-list-item" key={keyIndex}>
							<img src={item.url} />
						</li>
					)
				};
				for (let i = 0; i < item.size; i++) {
					tplArray.push(buildItem(i));
				}				
			}

			return tplArray;
		});

		console.log('groupList1', groupList);
		groupList = Util.flatten(groupList);

		console.log('groupList2', groupList);

		// 修正长度
		groupList = groupList.length > 13 ? groupList.slice(0, 13) : groupList;

		let st = this.props.startTime || new Date().getTime() - 3720; // test

		return (
			<div className="u-group-count-down">
				<ul className="group-list">
					{groupList}
				</ul>

				<div className="u-count-down">
					<CountDown startTime={st} />
				</div>
			</div>
		)
	}
}

