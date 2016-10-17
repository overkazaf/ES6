import React, {Component} from 'react';
import './FeeList.scss'


export default class FeeList extends Component {

	constructor (props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps.info) {
	 		this.setState({
	 			data: nextProps.info
	 		});
	 	}     
	}

	render () {

		let tableContent = this.state.data.map(function (item, index) {
			let itemKey = `table-line-${index}`;
			let {
				label,
				price,
				extra
			} = item;

			return (
				<tr key={itemKey}>
					<td>{label}</td>
					<td>{price}</td>
					<td>{extra}</td>
				</tr>
			);
		});
		return (
			<div className="m-fee-list">
				<div className="title">费用清单</div>
				<table className="u-fee-table">
					{tableContent}
				</table>
			</div>
		)
	}
}
