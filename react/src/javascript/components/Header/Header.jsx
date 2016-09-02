import React, {Component} from 'react'
import './Header.scss'

export default 
class Header extends Component {
	constructor (props) {
		super(props);
	}

	handleLeftBtnClick () {
		alert('back');
	}

	handleRightBtnClick () {
		alert('share');
	}

	render () {
		return (
			<header className="m-header">
				<div onClick={this.handleLeftBtnClick.bind(this)} className="header-left-btn fa-angle-left"></div>
				<h1 className="title">{this.props.title}</h1>
				<div onClick={this.handleRightBtnClick.bind(this)} className="header-right-btn fa-angle-right"></div>
			</header>
		)
	}
}

