import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RouteItem from 'components/RouteItem/RouteItem';
import PayMethod from 'components/PayMethod/PayMethod';
import Util from 'extend/util';
import WeixinUtil from 'extend/WeixinUtil';
import 'scss/base.scss';
import 'scss/Pay/index.scss';


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			groupId: null,
			item: this.props.info || {}
		};
	}

	componentDidMount () {
		let that = this;
		let detailId = fetchParamValueByCurrentURL('detailId');
		if (detailId) {
			let groupStatusParam = {
				url: 'tour/tourMessage',
				method: 'get',
				data : {
					id : detailId
				},
				successFn: function (result) {
					if (Util.isResultSuccessful(result.success)) {
						let newState = Util.rebuildItemState(result.data);
						that.setState({
							item: newState,
							groupId : newState.groupId
						}, ()=>{
							console.log('newState', that.state);
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

	render () {
		let that = this;
		let routeItemInfo = this.state.item;
		let payPrice;
		let groupId = this.state.groupId;
		if (this.state.payPrice) {
			payPrice = new Number(this.state.payPrice).toFixed(2);
		}
		return (
			<div className="m-pay-info">
				<RouteItem parentContext={that} handleInfoChange={that.handleInfoChange} info={routeItemInfo}/>
				<PayMethod groupId={groupId} payPrice={payPrice}/>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);