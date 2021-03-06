import React, {Component} from 'react';
import RouteItem from 'components/RouteItem/RouteItem';
import PayMethod from 'components/PayMethod/PayMethod';
import ReactDOM from 'react-dom';
import Status from 'extend/status';
import Util from "extend/util";
import WeixinUtil from 'extend/WeixinUtil';
import 'scss/base.scss';
import 'scss/OrderDetail/index.scss';
import Accordion from 'components/Accordion/Accordion';

class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			groupId: null,
			item: null,
			data: null,
			invoiceTitle: null
		};
	}

	componentDidMount () {
		let that = this;
		let detailId = Util.parseQueryString(location.href)['detailId'];
		if (detailId) {
			let groupStatusParam = {
				url: 'tour/order',
				method: 'get',
				data : {
					detailId : detailId
				},
				successFn: function (result) {
					let res = result;
					if (Util.isResultSuccessful(res.success)) {
						let newState = Util.rebuildItemState(res.data.data);
						that.setState({
							item: newState,
							groupId : newState.groupId,
							data: res.data,
							invoiceTitle: res.data.invoiceTitle
						});
					}
					
				},
				errorFn: function() {
					console.error(arguments);
				}
			};
			Util.fetchData(groupStatusParam);

			this.addHistoryBackListener(detailId);

		}
		WeixinUtil.hideWeixinMenu();  
	}

	/**
	 * [addHistoryBackListener 为返回按钮添加监听事件]
	 * @param {[type]} detailId [description]
	 */
	addHistoryBackListener (detailId) {
		let pushHistory = () => {  
	        var state = {  
	            title: document.title,  
	            url: location.href  
	        };  
	        window.history.pushState(state, state.title, state.href);  
	    };

	    pushHistory();
		window.addEventListener("popstate", function(e) {
			// let href = 'http://172.16.11.133:8090/webpack-dev-server/wxPages/FillInfo?detailId=' + detailId;
			// if (Util.isGroup()) {
			// 	href += '&isGroup=true';
			// }
			// // 这里应该向后台的controller发一个请求，拿到之前填写的用户数据
	  		//       location.href = href;

	    }, false);
	}

	handleInfoChange (state) {
		
		this.setState({
			payPrice: state.price
		})
	}

	handleCountDownFinished () {
		this.refs['routeItem'].handleItemStatusChange({
			type: 'COUNT_DOWN_FINISHED',
			payStatus: 4
		});
	}


	checkIfCanModInvoiceTitle (routeItemInfo, statusCodes) {
		if (!routeItemInfo || Object.keys(routeItemInfo).length == 0) {
			return false;
		}

		return routeItemInfo.payStatus == statusCodes[routeItemInfo.type]['PENDING'];
	}

	render () {

		if (!this.state.item) {
			return (
				<div></div>
			)
		}

		let that = this;
		let routeItemInfo = this.state.item;
		let data = this.state.data;
		let payPrice;
		let groupId = this.state.groupId;
		let invoiceTitle = this.state.invoiceTitle;
		let startTime = routeItemInfo.groupStartTime;
		let statusCodes = Status.getStatusCodes();
		let canModInvoiceTitle =  this.checkIfCanModInvoiceTitle(routeItemInfo, statusCodes);
		let hasCountDown = canModInvoiceTitle && (1 * 60 * 60 * 1000 + (+new Date(startTime).getTime()) - (+new Date().getTime()) > 0)
		if (this.state.payPrice) {
			payPrice = new Number(this.state.payPrice).toFixed(2);
		}
		let cannotPay = !canModInvoiceTitle;

		// console.log('1 * 60 * 60 * 1000 + startTime', 1 * 60 * 60 * 1000 + (+new Date(startTime).getTime()));
		// console.log('(new Date().getTime())', (new Date().getTime()));
		// console.log('canModInvoiceTitle', canModInvoiceTitle);
		// console.log('hasCountDown', hasCountDown);
		return (
			<div className="m-orderdetail">
				<RouteItem
					ref="routeItem"
					parentContext={that} 
					handleInfoChange={that.handleInfoChange} 
					info={routeItemInfo}
				/>

				<PayMethod 
					groupId={groupId} 
					payPrice={payPrice}
					cannotPay={cannotPay}
					canModInvoiceTitle={canModInvoiceTitle}
					invoiceTitle={invoiceTitle}
					hasCountDown={hasCountDown}
					handleCountDownFinished={this.handleCountDownFinished.bind(this)}
					startTime={startTime}
				/>
				<Accordion info={data}/>
			</div>
		)
	}
}


function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);