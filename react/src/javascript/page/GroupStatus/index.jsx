import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GroupStatus from 'components/GroupStatus/GroupStatus'
import 'scss/base.scss'
import 'scss/GroupStatus/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		
	}

	render () {
		return (
			<div className="m-group-info">
				<GroupStatus />
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);