import React, {Component} from 'react';
import Util from "extend/util";
import 'scss/base.scss';
import 'scss/NewPage/index.scss';

class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				NewPage Component to implement
			</div>
		)
	}
}


function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);