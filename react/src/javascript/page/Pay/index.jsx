import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import RouteItem from 'components/RouteItem/RouteItem'
import PayMethod from 'components/PayMethod/PayMethod'
import 'scss/base.scss'
import 'scss/Pay/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		
	}

	render () {
		return (
			<div className="m-pay-info">
				<RouteItem />
				<PayMethod />
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);