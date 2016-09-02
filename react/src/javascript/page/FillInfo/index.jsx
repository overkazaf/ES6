import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from 'components/Header/Header';
import InfoForm from 'components/InfoForm/InfoForm';
import Util from 'lib/util';
import 'scss/base.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		
	}

	render () {
		
		let title = '填写团出行信息';

		return (
			<div>
				<Header title={title} />
				<InfoForm />
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);