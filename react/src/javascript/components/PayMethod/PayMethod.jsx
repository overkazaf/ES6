import React, {Component} from 'react';
import Util from 'extend/util';
import 'scss/base.scss';
import './PayMethod.scss';


export default class PayMethod extends Component {
	constructor (props) {
		super(props);

		this.state = {
			detailId: Util.parseQueryString(location.href)['detailId'],
			groupId: null,
			payMethod: {
				weixin: true
			},
			invoice: {
				checked : false
			},
			invoiceTitleValue : '',
			protocol: {
				checked: true
			},
			cannotPay : false,
			startTime : this.props.startTime,
			hasCountDown: !!this.props.hasCountDown,
			countDownMessage: null,
			payPrice: this.props.payPrice || '00.00',
			canModifyInvoiceTitle: true
		};
	}

	changeInvoice () {

		this.setState({
			invoice : {
				checked : !this.state.invoice.checked
			}
		})
	}

	changeProtocol () {
		this.setState({
			protocol : {
				checked : !this.state.protocol.checked
			}
		})
	}

	noCountDown (countDown) {
		return countDown && (parseInt(countDown.minutes) == 0 && parseInt(countDown.seconds) == 0)
	}

	componentWillReceiveProps(nextProps) {
		let that = this;
	    if (nextProps.payPrice) {
	    	this.setState({
	    		payPrice : nextProps.payPrice
	    	});
	    }  

	    if (nextProps.groupId) {
	    	this.setState({
	    		groupId: nextProps.groupId
	    	});
	    }

	    if (nextProps.invoiceTitle) {
	    	this.setState({
	    		invoiceTitleValue: nextProps.invoiceTitle,
	    		invoice: {
					checked : false // 这个还要判断一下，待支付状态下是可以修改的
				}
	    	});
	    }

	    if (nextProps.canModifyInvoiceTitle) {
	    	this.setState({
	    		canModifyInvoiceTitle: nextProps.canModifyInvoiceTitle
	    	});
	    }

	    if (nextProps.startTime) {
	    	this.setState({
	    		startTime: nextProps.startTime,
	    		hasCountDown: true,
	    		countDownMessage: that.buildCountDownMessage(that.calcCountDown())
	    	}, ()=>{
	    		let fn = function(){

	    			let countDown = that.calcCountDown();
    				if (that.noCountDown(countDown)) {
    					
    					that.setState({
    						hasCountDown: false,
		    				cannotPay: true,
		    				countDownMessage: ''
		    			}, ()=>{
		    				that.timer = null;
		    				clearInterval(that.timer);
		    			});
    				} else {
    					that.setState({
		    				countDownMessage: that.buildCountDownMessage(countDown)
		    			});
    				}

    				if (!that.state.hasCountDown) {
    					that.timer = null;
    					clearInterval(that.timer);
    				}
	    		};

	    		fn();
	    		if (!that.timer && that.state.hasCountDown) {
	    			that.timer = setInterval(fn, 1000);
	    		}
	    		
	    	});
	    }
	}

	conpomentDidMount () {
		Util.inPage();
		Util.fixFixed();
		Util.addUserPageInfoUploadListener();
	}

	handlePay () {
		
		let that = this;
		let detailId = this.state.detailId;
		let prePayParam = {
			url : 'tour/pay',
			method: 'post',
			data :  {
				id: +detailId,
				userId: Util.getCurrentUserId(),
				invoiceTitle: this.state.invoiceTitleValue,
				payType:1,
				agreeRule: this.state.protocol.checked
			},
			successFn : function (result) {

				if (Util.isResultSuccessful(result.success)) {
					let json = result.data.data;
					let onBridgeReady = function (){
					   WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', {
				           "appId" : json.appId,     //公众号名称，由商户传入     
				           "timeStamp" : json.timeStamp,    //时间戳，自1970年以来的秒数     
				           "nonceStr" : json.nonceStr, //随机串     
				           "package" : json.packageStr,     
				           "signType" : "MD5",         //微信签名方式：     
				           "paySign" : json.paySign //微信签名 
				       },
				       function(res){
				       	    let returnCode,
				       	        tradeSerialId = json.tradeSerialId;

				           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				           	  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
				           	  returnCode = 'SUCCESS';
				           	  // alert('weixin支付成功, tradeSerialId::' + tradeSerialId);
				           } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
				           	  returnCode = 'FAILED';
				           }else {
				           	  // alert('weixin支付失败');
				           	  returnCode = 'FAILED';
				           }

				           
							let afterPayParam = {
								url: 'tour/paySyncCallBack',
								method: 'post',
								data: {
									tradeId: tradeSerialId,
									recordDetailId: +detailId,
									transactionId: null,
									returnCode: returnCode
								},
								successFn: function (result) {
									if (result || result== 'true') {
										Util.leavePage(function () {
											if (returnCode == 'SUCCESS') {
												// 成功后跳转到分享页
												location.href = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/Share/index.html?detailId='+ detailId +'&groupId=' + that.state.groupId;
											} else {
												// 失败后回到填写信息的页面
												let fillInfoUrl = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/FillInfo/index.html';
												fillInfoUrl += '?isGroup=true&detailId=' + detailId + "&groupId=" + that.state.groupId;
												//alert('fail, and redirect to url:' + fillInfoUrl);
												location.href = fillInfoUrl;
											}
										});
									} else {
										alert('支付失败:' + result.errorMSG);
										that.setState({
											cannotPay: true
										});
									}
								},
								errorFn: function () {
									console.error(arguments);
								}
							};

							Util.fetchData(afterPayParam);

				       })
					}
					
					if (typeof WeixinJSBridge == "undefined"){
					   if( document.addEventListener ){
					       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					   }else if (document.attachEvent){
					       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
					       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					   }
					}else{
					   onBridgeReady();
					}
				} else {
					if (result.errorCode == 400) {
						that.setState({
							cannotPay: true
						});
						alert(result.errorMSG);
					} else {
						alert('支付失败:' + result.errorMSG);
					}
				}
			},
			errorFn: function () {
				console.error(arguments);	
			}
		};

		//console.log('prePayParam', prePayParam);
		Util.fetchData(prePayParam);
	}

	handleInvoiceTitleChange (ev) {
		this.setState({
			invoiceTitleValue: ev.target.value
		}, () => {
			//console.log('invoiceTitle change', this.state);
		});
	}

	buildCountDownMessage (countDown) {
		if(!countDown) return '';
		else return `(还剩${countDown.minutes}分${countDown.seconds}秒)`;	
	}

	calcCountDown () {
		let startTime = this.state.startTime;
		let countDown, countDownMessage;

		if (startTime) {
			//　结束时间为当前时间加1小时
			let endTime = 1 * 60 * 60 * 1000 + new Date("2016-10-14 13:43:24").getTime();
			let currentTime = new Date().getTime();
			let leftTime = Math.floor(~~(endTime - currentTime)/1000);
			if (leftTime > 0) {
				countDown = Util.calcCountDownByLeftTime(leftTime);
			} else {
				// 剩余时间为负数，不可支付
				this.setState({
					cannotPay: true
				});
			}
		}
		return countDown;
	}

	/**
	 * [buildPayButtonByCurrentStatus 根据当前的按钮状态生成支付按钮]
	 * @return {[type]} [description]
	 */
	buildPayButtonByCurrentStatus () {
		let that = this;
		let payBtn;

		if (Util.isGroup()) {
			if (!this.state.protocol.checked || this.state.cannotPay) {
				payBtn = <div className="pay-btn disabled">
							立即（开团）支付
						 </div>
			} else {
				payBtn = <div onClick={that.handlePay.bind(that)} className="pay-btn">
							立即（开团）支付
						 </div>
			}
		} else {
			if (!this.state.protocol.checked || this.state.cannotPay) {
				payBtn = <div className="pay-btn disabled">
							立即支付
						 </div>
			} else {
				payBtn = <div onClick={that.handlePay.bind(that)} className="pay-btn">
							立即支付
						 </div>
			}
		}

		return payBtn;
	}

	render () {

		let that = this,
			invoiceTitle, //发票
			protocol, // 平台协议
			payPrice = this.state.payPrice,
			isInvoiceDisabled = true,
			payBtn,
			invoiceTitleValue = this.state.invoiceTitleValue,
			canModifyInvoiceTitle = this.state.canModifyInvoiceTitle,
			countDownMessage = this.state.hasCountDown? this.state.countDownMessage : '';

		// console.log('canModifyInvoiceTitle', canModifyInvoiceTitle);

		if (canModifyInvoiceTitle) {
			if (this.state.invoice.checked) {
				isInvoiceDisabled = false;
				invoiceTitle = <i className="chk-component checked"  onClick={this.changeInvoice.bind(this)}></i>;
			} else {
				invoiceTitle = <i className="chk-component unchecked" onClick={this.changeInvoice.bind(this)}></i>;
			}
		} else {
			invoiceTitle = <i className="chk-component unchecked"></i>;
		}


		if (this.state.protocol.checked) {
			protocol = <i className="chk-component checked" onClick={this.changeProtocol.bind(this)}></i>;
		} else {
			protocol = <i className="chk-component unchecked" onClick={this.changeProtocol.bind(this)}></i>;
		}


		payBtn = this.buildPayButtonByCurrentStatus();



		return (
			<div className="m-pay-method">
				<div className="title">支付方式</div>
				<section className="pay-info slashed">
					<div>
						<i className="sel-component selected"></i>
						<span className="weixin-icon"></span>微信支付
					</div>
				</section>

				<section className="pay-info">
					<div>
						{invoiceTitle}
						开具增值税发票 <span className="desc">（发票将在开团成功后5日寄出）</span>
					</div>
					<div>
						<input disabled={isInvoiceDisabled} value={invoiceTitleValue} onChange={that.handleInvoiceTitleChange.bind(that)} type="text" className="invoiceTitle" placeholder="输入发票抬头" />
					</div>
				</section>
				<section className="pay-info gray">
					{protocol}
					<span className="aggree-desc">我同意《一起逛平台服务协议》</span>
				</section>
				<div className="pay-now footer-fixed">
					<div className="total-price">
						<span className="price">￥{payPrice}</span>
						<span className="count-down-msg">
							{countDownMessage}
						</span>
					</div>
					{payBtn}
				</div>
			</div>
		)
	}
}