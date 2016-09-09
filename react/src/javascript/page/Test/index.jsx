import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Modal from 'components/Modal/Modal'
import 'scss/base.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	closeModal () {
		alert('closing Modal');
	}

	render () {
		let modalTitle = "我的测试模态窗口";
		return (
			<Modal title={modalTitle} />
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);