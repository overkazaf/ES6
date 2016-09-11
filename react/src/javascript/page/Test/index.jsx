import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Modal from 'components/Modal/Modal'
import 'scss/base.scss'
import 'scss/Test/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	closeModal () {
		alert('closing Modal');
	}

	render () {
		let modalTitle = "我的测试模态窗口",
			modalStatus = {},
			modalTpl = {
				body: function (){
					return (
						<div className="play-intro"></div>
					)
				}
			};
		return (
			<Modal 
				title={modalTitle} 
				modalTpl={modalTpl}
			/>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);