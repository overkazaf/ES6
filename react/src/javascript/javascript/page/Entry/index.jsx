import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Entry from 'components/Entry/Entry';
import Hammer from 'lib/hammer.min.js';
import Tooltip from 'components/Tooltip/Tooltip';
import 'scss/base.scss';
import 'scss/Entry/index.scss';

class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount() {
		let that = this;
	 	document.getElementById('log').onclick = function() {
	 		that.refs.tooltip.show({
	 			message: '显示信息',
	 			direction: 'top',
	 			callback : function (){
	 				
	 			}
	 		});
	 	};     
	}

	render () {
		return (
			<div className="m-container">
				<Tooltip
				ref="tooltip"
				refEl="log" />
			</div>
		)
	}
}


function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}



setTimeout(doRender, 16);