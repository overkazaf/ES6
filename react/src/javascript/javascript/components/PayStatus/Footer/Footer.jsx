import React, {Component} from 'react';
import './Footer.scss';

export default class Footer extends Component {
	render () {
		return (
			<div className="m-footer">
				<div className="u-btn-group">
					<button className="btn btn-view">查看订单</button>
					<button className="btn btn-home">返回首页</button>
				</div>
			</div>
		)
	}
}