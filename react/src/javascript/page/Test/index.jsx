import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Modal from 'components/Modal/Modal'
import Util from 'lib/util'
import 'scss/base.scss'
import 'scss/Test/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
	}

	closeModal () {
   //       Util.setCookie('user', '123', 60*60);
		 // console.log('closing Modal');
   //       console.log(Util.getCookie('user'));
   //       console.log(Util.deleteCookie('a'));
   //       console.log(Util.deleteCookie('user'));
   //       console.log(document.cookie);
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
                isShown={true}
                onModalClose={this.closeModal}
				modalTpl={modalTpl}
			/>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);