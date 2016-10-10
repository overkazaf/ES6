import React, {Component} from 'react';
import Util from 'lib/util';
import Status from 'lib/status';
import 'scss/base.scss';
import './RouteItem.scss';

export default class RouteItem extends Component {
	constructor (props) {
		super(props);
        /*
          {
             "id": item.id,
             "price" : item.payPrice,
             "name" : "routeName",
             "groupMemberNumber" :  totalCount,
             "kid": kidCount,
             "adult": adultCount,
             "groupStartTime" : Util.formatTimestamp(item.startTime),
             "travelTime": item.travelTime,
             "travelAddress": item.travelAddress
          }  
        */
         this.state = this.props.info;
	}


    componentWillReceieveProps (nextProps) {
        if (nextProps && nextProps.newInfo) {
            this.setState(nextProps.info);
        }
    }

    componentDidMount () {
		let that = this;
		let detailId = Util.fetchParamValueByCurrentURL('detailId');
		let isInMyRouteList = function () {
			return detailId && that.props.handleInfoChange;
		};
		if (isInMyRouteList()) {
			// 
			let groupStatusParam = {
				url: 'tour/tourMessage',
				method: 'get',
				data : {
					id : detailId
				},
				successFn: function (result) {
					if (Util.isResultSuccessful(result.success)) {
						let newState = Util.rebuildItemState(result.data);
						that.setState(newState, ()=>{
							if (that.props.handleInfoChange) {
								that.props.handleInfoChange.call(that.props.parentContext, that.state);
							}
						});
					}
				},
				errorFn: function() {
					console.error(arguments);
				}
			};
			Util.fetchData(groupStatusParam);
		}
	}

	/**
	 * [getStatusDivByStatus 根据当前的行程状态生成右下角的状态块]
	 * @param  {[type]} status [行程状态，与Status.getStatusCodes一一对应]
	 * @param  {[type]} statusCodes [行程状态码映射表]
	 * @return {[type]}        [description]
	 */
	getStatusDivByStatus (status, statusCodes) {
		let statusDiv;
		switch (status) {
			case statusCodes.RUNNING:
				statusDiv = (<div className="item-status-text">拼团中</div>);
				break;
			case statusCodes.SUCCESS:
				statusDiv = (<div className="item-seal success"></div>);
				break;
			case statusCodes.FAIL:
				statusDiv = (<div className="item-seal fail"></div>);
				break;
			case statusCodes.PENDING:
				statusDiv = (<div className="item-status-text">待支付</div>);
				break;
			default:
				statusDiv = (<div className="item-status-text">拼团中</div>);
				break;
		}
		return statusDiv;
	}

	generateItemHrefByStatusInfo (status, statusCodes, groupId, detailId) {
		let href = '';
		switch (status) {
			case statusCodes.PENDING:
			href = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/Pay/index.html?groupId=' + groupId+"&detailId=" + detailId;
			break;
			default:
			href = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/Share/index.html?groupId=' + groupId+"&detailId=" + detailId;
			break;
		}
		return href;
	}

	getStatusTextByStatusCode (status, statusCodes) {
		let text = '';
		switch (status) {
			case statusCodes.PENDING:
				text = '待支付';
				break;
			case statusCodes.RUNNING:
				text = '拼团中';
				break;
			default:
				text = '拼团中';
		}
		return text;
	}

	render () {
		let {
			id,
			groupId,
			name,
			travelTime,
			adult,
            kid,
			travelAddress,
			price,
			status
		} = this.state;

		let statusCodes = Status.getStatusCodes();
            
		let statusText = this.getStatusTextByStatusCode(status, statusCodes);   // 2为拼团中 3为已成团 4为拼团失败
		let statusDiv = this.getStatusDivByStatus(status, statusCodes);
		let detailId = id;

		// 根据status, groupId, detailId生成行程链接
		// 因为新加了预支付状态，预支付状态点击以后要跳转到相应的支付页面
		let itemHref = this.generateItemHrefByStatusInfo(status, statusCodes, groupId, detailId);
		return (
			<a href={itemHref} className="u-route-item">
				<div className="column">
					<a className="item-image"></a>
				</div>
				<div className="column item-detail">
					<h2 className="item-name">{name}</h2>
					<div className="item-desc">
						出行日期：
						<span className="item-start-date">{travelTime}</span>
					</div>
					<div className="item-desc">
						出行人数：
						<span className="item-group-members">
							<i>成人{adult}</i>
							<i>儿童{kid}</i>
						</span>
					</div>
					<div className="item-desc">
						出发地：
						<span className="item-source-place">{travelAddress}</span>
					</div>
					<b className="item-price">
						￥{price} </b>

					{statusDiv}
				</div>
			</a>
		)
	}
}