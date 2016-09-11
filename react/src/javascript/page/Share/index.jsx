import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GroupStatus from 'components/GroupStatus/GroupStatus';
import ShareModal from 'components/ShareModal/ShareModal';
import 'scss/base.scss'
import 'scss/GroupStatus/index.scss'
import 'scss/Share/index.scss'

class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			modal : {
				isShown : false,
				modalTpl : {
					body : function () {
						return (
							<div className="share-img"></div>
						)
					}
				}
			}
		};
	}

	componentDidMount () {
		//this.initShare();	
	}

	initShare () {
		let onBridgeReady = function () {
			alert('ready');
			for (let attr in WeixinJSBridge) {
				$('#log').append($('<li></li>').html(attr));
			}
			WeixinJSBridge.call('hideOptionMenu');
	 	}
		  
		if (typeof WeixinJSBridge === "undefined"){
		    if (document.addEventListener){
		        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		    }
		}else{
		    onBridgeReady();
		    this.sendMessage();
		}
	};

	handleShare () {
		this.setState({
			modal: {
				isShown: true,
				modalTpl: {
					body : function () {
						return (
							<div className="share-img"></div>
						)
					}
				}
			}
		});
	}

	render () {
		let list = [
			{url: 'aaa.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: true},
			{url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
			{url: 'jjj.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: false}
		];
		let {isShown, modalTpl} = this.state.modal;

		return (
			<div className="m-group-info">
				<GroupStatus list={list}/>
				<ShareModal isShown={isShown} modalTpl={modalTpl} />
				<div className="invite-btn" onClick={this.handleShare.bind(this)}>
					邀请好友来参团
				</div>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);