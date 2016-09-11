import React, {Component} from 'react'
import RouteItem from 'components/RouteItem/RouteItem'
import './RouteItemList.scss'

export default 
class RouteItemList extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		let items = !this.props.items ? null : this.props.items.map(function (item) {
			return (
				<li class="route-list-item">
					<RouteItem item={item} />
				</li>
			)
		});
		return (
			<ul className="m-route-list">
				{items}
			</ul>
		)
	}
}

