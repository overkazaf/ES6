import React, {Component} from 'react';
import './Footer.scss';

export default class Footer extends Component {
	handleClick (strategy) {
		let strategies = {
			'viewOrder' : function () {
				console.log('viewOrder');
			},
			'back2List' : function () {
				console.log('back2List');
			}
		};

		strategies[strategy]();
	}

	render () {
		return (
			<div className="m-footer">
				<div className="u-btn-group">
					<button onClick={this.handleClick.bind(this, 'viewOrder')} className="btn btn-view">查看订单</button>
					<button onClick={this.handleClick.bind(this, 'back2List')} className="btn btn-home">返回首页</button>
				</div>
			</div>
		)
	}
}