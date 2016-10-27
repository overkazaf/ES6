import React, {Component} from 'react';
import './FeeList.scss'


export default class FeeList extends Component {

	constructor (props) {
		super(props);

		// let mockData = require('mock/fill-info.json').data;
		// delete mockData.conditions;

		this.state = {
			data: this.props.info
			//data: mockData 
		};
	}

	render () {
		let feeData = this.state.data;
		let tableContent = Object.keys(feeData).map(function (dataKey) {
			// hard code here
			let tableTitle = (dataKey == 'includes') ? '费用包含':'费用不含';
			
			let tableData = feeData[dataKey];
			let tableLineContent = tableData.map(function (currentItem, index){
				let itemKey = `table-line-${index}`;
				let {
					item,
					desc,
					extra
				} = currentItem;

				return (
					<tr key={itemKey}>
						<td>{item}</td>
						<td>{desc}</td>
						<td>{extra}</td>
					</tr>
				);
			});

			if(!tableData || tableData.length == 0) {
				return (
					<div></div>
				);
			}

			return (
				<table className="fee-detail-table">
					<th><td colSpan="3">{tableTitle}</td></th>
					{tableLineContent}
				</table>
			);
		});
		return (
			<div className="m-fee-list">
				<div className="title">费用说明</div>
				<div className="u-fee-table">
					{tableContent}
				</div>
			</div>
		)
	}
}
