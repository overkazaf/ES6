import React, {Component} from 'react'
import './Header.scss'

export default 
class Header extends Component {
	constructor (props) {
		super(props);
	}

	goBack () {
		alert('back');
	}

	render () {
		return (
			<header className="m-header">
				<div onClick={this.goBack.bind(this)} className="fa-angle-left"></div>
				<h1 className="title">{this.props.title}</h1>
			</header>
		)
	}
}

