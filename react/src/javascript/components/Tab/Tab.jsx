import React, {Component} from 'react'
import './Tab.scss'

export default 
class Tab extends Component {
	constructor (props) {
		super(props);
	}

	handleItemClick (item, index) {
		if (this.props.handleItemClick) {
			this.props.handleItemClick(item, index);
		}
	}

	render () {
		let _this = this;
		let activeIndex = this.props.activeIndex;
		let tabs = this.props.tabs.map(function (item, index) {
			let clazz = (index !== activeIndex) ? 'tab-item' : 'active tab-item';

			return (
				<li onClick={() => {
					_this.handleItemClick(item, index);
				}} className={clazz} key={index}>
					{item}
				</li>
			)
		});
		return (
			<ul className="m-tab">
				{tabs}
			</ul>
		)
	}
}

