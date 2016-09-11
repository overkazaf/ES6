import React, {Component} from 'react';
import './PlayIntro.scss'


export default class PlayIntro extends Component {
	constructor (props) {
		super(props);
	}

	handleClick () {

		if (this.props.handlePlayIntroClick) {
			this.props.handlePlayIntroClick();
		}
	}

	render () {
		return (
			<div onClick={this.handleClick.bind(this)} className="m-play-intro">
			</div>
		)
	}
}