import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import InfoForm from 'components/InfoForm/InfoForm';
import 'scss/base.scss'
import 'scss/FillInfo/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		
	}

	render () {
		return (
			<div className="m-fill-info">
				<InfoForm />
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);