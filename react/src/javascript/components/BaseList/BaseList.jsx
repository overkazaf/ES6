import React, {Component} from 'react'
import './BaseList.scss'

export default 
class BaseList extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		let items = !this.props.items ? null : this.props.items.map(function (item) {
			return (
				<li className="base-list-item">
					{item.name}
				</li>
			)
		});
		return (
			<ul className="m-base-list">
				{items}
			</ul>
		)
	}
}

