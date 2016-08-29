import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Entry from 'components/Entry/Entry'
import Hammer from 'lib/hammer.min.js'
import 'scss/base.scss'
import 'scss/Entry/index.scss'

let _ = {};
let log = document.getElementById('log');

_.isSupportWeiXinPay = function(){
  var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\\.]+)/i) ;
  if( !wechatInfo ) {
      return false;
  } else if ( wechatInfo[1] < "5.0" ) {
     return false;
  }
  return true;
};
_.payOfWeixin = function () {
	WeixinJSBridge.invoke(
       'getBrandWCPayRequest', {
           "appId": "wx2421b1c4370ec43b",     //公众号名称，由商户传入     
           "timeStamp": " 1395712654",         //时间戳，自1970年以来的秒数     
           "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串     
           "package": "prepay_id=u802345jgfjsdfgsdg888",     
           "signType": "MD5",         //微信签名方式：     
           "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
       },
       function(res){     
       		html(log, res)
           if(res.err_msg == "get_brand_wcpay_request：ok" ) {
           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
       }
   ); 
};

class MyComponent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			items : [1, 2, 3, 4]
		};
	}

	onClick () {
		alert('onClick');
		_.payOfWeixin();
	}

	render () {
		return (
			<div className="m-container">
				<Item handleClick={this.onClick} />
			</div>
		)
	}
}

class Item extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name : 'constructor'
		};
	}

	render() {
		return (
			<button onClick={this.props.handleClick}>
				Click Me
			</button>
		)
	}
}

function doRender () {
	//ReactDOM.render(<MyComponent /> , document.getElementById("app"));
	if (typeof WeixinJSBridge == "undefined"){
	    html(log, 'undefined');
	    if( document.addEventListener ){
	    	html(log, 'addEvent');
	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	    }else if (document.attachEvent){
	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	    }
	}else{
	   onBridgeReady();
	}
}

function html (dom, tpl, replace) {
	if (dom) {
		if (!!replace) {
			dom.innerHTML = tpl;
		} else {
			dom.innerHTML = dom.innerHTML + '<br />' + tpl;
		}
	}
}

function onBridgeReady(){
	html(log, 'ready');
	html(log, _.isSupportWeiXinPay());
}




setTimeout(doRender, 16);