import React, {Component} from 'react';
import Util from 'extend/util';
import Status from 'extend/status';
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
	 * @param  {[type]} type [订单类型，１为拼团，２为单独购买]
	 * @param  {[type]} status [行程状态，与Status.getStatusCodes一一对应]
	 * @param  {[type]} statusCodes [行程状态码映射表]
	 * @return {[type]}        [description]
	 */
	getStatusDivByStatus (type, status, statusCodes) {
		let statusDiv;
		let codes = statusCodes[type];
		if (type == 1) {
			switch (status) {
				case codes.RUNNING:
					statusDiv = (<div className="item-status-text">拼团中</div>);
					break;
				case codes.SUCCESS:
					statusDiv = (<div className="item-seal success"></div>);
					break;
				case codes.FAIL:
					statusDiv = (<div className="item-seal fail"></div>);
					break;
				case codes.PENDING:
					statusDiv = (<div className="item-status-text">等待支付</div>);
					break;
				default:
					statusDiv = (<div className="item-status-text">拼团中</div>);
					break;
			}
		} else if (type == 2) {
			//　单独购买
			switch (status) {
				case codes.SUCCESS:
					statusDiv = (<div className="item-seal success"></div>);
					break;
				case codes.CANCEL:
					statusDiv = (<div className="item-seal fail"></div>);
					break;
				case codes.PENDING:
					statusDiv = (<div className="item-seal pending"></div>);
					break;
			}

			console.log('status', status);

		}
		return statusDiv;
	}

	generateItemHrefByStatusInfo (type, status, statusCodes, groupId, detailId) {
		let href = '';
		let codes = statusCodes[type];
		if (type == 1) {
			switch (status) {
				case codes.PENDING:
					href = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/Pay/index.html?groupId=' + groupId+"&detailId=" + detailId;
				break;
				default:
					href = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/Share/index.html?groupId=' + groupId+"&detailId=" + detailId;
					break;
			}
		} else if (type == 2) {
			switch (status) {
				default:
					href = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/OrderDetail/index.html?groupId=' + groupId+"&detailId=" + detailId;
					break;
			}
		}
		
		return href;
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
			status,
			payStatus,
			type // 类型，１为拼团，２为单独购买
		} = this.state;

		let statusCodes = Status.getStatusCodes();
		let statusDiv = this.getStatusDivByStatus(type, payStatus, statusCodes);
		let detailId = id;

		// 根据status, groupId, detailId生成行程链接
		// 因为新加了预支付状态，预支付状态点击以后要跳转到相应的支付页面
		let itemHref = this.generateItemHrefByStatusInfo(type, payStatus, statusCodes, groupId, detailId);
		// console.log('itemHref', itemHref);
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