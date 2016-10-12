import React, {Component} from 'react';
import Util from "lib/util";
import 'scss/base.scss';
import 'scss/PaySuccess/index.scss';

class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				PaySuccess Component to implement
			</div>
		)
	}
}


function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);