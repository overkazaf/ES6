import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GroupStatus from 'components/GroupStatus/GroupStatus'
import 'scss/base.scss'
import 'scss/GroupStatus/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			status : {}
		};
	}

	componentDidMount () {
		
	}

	render () {
		let {status} = this.state;

		return (
			<div className="m-group-order-info">
				<GroupStatus status={status}/>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);