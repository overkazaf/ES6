import React, {Component} from 'react';
import './Header.scss';

export default class Header extends Component {
	render () {
		return (
			<div className="m-header">
				<img className="status-img"/>
				<div className="status-text">
					用户已付款
				</div>
			</div>
		)
	}
}