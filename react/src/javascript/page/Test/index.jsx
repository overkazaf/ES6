import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from 'components/Gallery/Gallery'
import 'scss/base.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		let items = [
			'aaa.jpg',
			'bbb.jpg',
			'ccc.jpg',
			'ddd.jpg',
			'eee.jpg'
		];
		return (
			<Gallery pics={items} />
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);