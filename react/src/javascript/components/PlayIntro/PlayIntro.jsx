import React, {Component} from 'react';
import './PlayIntro.scss'


export default class PlayIntro extends Component {
	constructor (props) {
		super(props);
	}

	handleClick () {
		alert('点击了玩法介绍');
	}

	render () {

		return (
			<div onClick={this.handleClick} className="m-play-intro">
			</div>
		)
	}
}