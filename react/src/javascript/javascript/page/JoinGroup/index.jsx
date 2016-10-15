import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'components/Gallery/Gallery';
import Util from 'lib/util';
import WeixinUtil from 'lib/WeixinUtil';
import ShareConfig from 'lib/share/config.js';
import RouteDetailHeader from 'components/RouteDetail/RouteDetailHeader';
import RouteDetailInfo from 'components/RouteDetail/RouteDetailInfo';
import RouteDetailFooter from 'components/RouteDetail/RouteDetailFooter';
import RouteDetailExtendInfo from 'components/RouteDetail/RouteDetailExtendInfo';
import Notification from 'components/Notification/Notification';
import Alert from 'components/Alert/Alert';
import 'scss/base.scss';
import 'scss/JoinGroup/index.scss';


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			hasCountDown: true,
			hasShareBtn: true,
			routeDetail : {
				imageList : [
					'../../../res/images/RouteDetail/places/banner/banner1@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner2@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner3@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner4@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner5@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner6@3x.jpg'
				]
			},
			routeItem : this.props.routeItem,
			list : this.props.list || [],
			remain: this.props.routeItem && this.props.routeItem.remain || 0,
			status: 0,
			enter: false,
			message: '', // 错误的提示信息
			endTime: null
		};

	}

	initShare (detailId, sharedGroupId, remain, price) {
		// 分享成功后进行用户数据上报
		let sharedJoinGroupSuccParam = {
			url: 'logger/printUserShareInfo',
			data: {
				userId: Util.getCurrentUserId(),
				url: ShareConfig['joinGroup']().getLink(detailId, sharedGroupId),
				toPlatform: '' 
			},
			successFn : function (result) {
				console.log('result', result);
			},
			errorFn : function () {
				console.error(Array.prototype.slice.call(arguments));
			}
		};
		WeixinUtil.initWeixinJSBridge(function(config){
			// 这里是配置成功后的回调
			WeixinUtil.showOptionMenu();
			
			WeixinUtil.share2Friends({
				title: ShareConfig['joinGroup']().getTitle(remain, price),
				link: ShareConfig['joinGroup']().getLink(detailId, sharedGroupId),
				imgUrl: ShareConfig['joinGroup']().getSharedImgUrl(),
				desc: ShareConfig['joinGroup']().getDesc(remain),
				success: function () {
					//alert('intercept share2Friends successfully');

					Util.fetchData(sharedJoinGroupSuccParam);
				},
				cancel: function () {
					//alert('cancel share2Friends successfully');
				}
			});

			WeixinUtil.share2FriendCircle({
				title: ShareConfig['joinGroup']().getTitle(remain, price),
				link: ShareConfig['joinGroup']().getLink(detailId, sharedGroupId),
				imgUrl: ShareConfig['joinGroup']().getSharedImgUrl(),
				desc: ShareConfig['joinGroup']().getDesc(remain),
				success: function(){
					//alert('intercept share2FriendCircle successfully');
					Util.fetchData(sharedJoinGroupSuccParam);
				},
				cancel: function(){
					//alert('cancel share2FriendCircle successfully');
				},
				fail: function(){
					//alert('fail to call share2FriendCircle');
				}
			});
		});
	};


	leave () {
		this.setState({
			enter: false
		});
	}

	componentDidMount() {
		Util.inPage();
		Util.addUserPageInfoUploadListener();
		// 1. 先获取remain, endTime之类的信息
		let that = this;
		let detailId = Util.fetchParamValueByCurrentURL('detailId');
		if (detailId) {
			let groupStatusParam = {
				url: 'tour/tourMessage',
				method: 'get',
				data : {
					id : detailId
				},
				successFn: function (result) {
					if (result.success || result.success == 'true') {
						let newState = Util.rebuildItemState(result.data);

						that.setState({
							routeItem: newState,
							endTime: newState.groupEndTime,
							remain: newState.remain
						}, ()=>{
							//console.log('routeItem has been updated successfully', newState);
							//console.log('routeItem has been updated successfully', that.state);
							// 2. 更新CountDown
							let groupInfoParam = {
								url: 'groupRecordInfo/getGroupRecordDetailByGroupId',
								method:'POST',
								data:{
									id: newState.groupId
								},
								successFn: function (ret){
									if (ret.success || ret.success == 'true') {
										let groupList = that.buildGroupList(ret.data);

										that.setState({
											list : groupList,
											endTime: result.data.endTime,
											remain: newState.remain,
											status: newState.status
										}, () => {
											//console.log('groupList has been updated in join group page');
											//alert('that.state.endTime::' + that.state.endTime);
											let routeDetailInfo = that.refs['routeDetailInfo'];
											//alert('result.data:' + result.data.endTime);
											routeDetailInfo.updateEndTime(result.data.endTime);
											//alert('newState.remain::' + newState.remain);
											routeDetailInfo.updateRemain(newState.remain);
											// 初始化微信分享组件
											that.initShare(detailId, newState.groupId, newState.remain, newState.price);
										});
									}
								},
								errorFn: function () {

									//alert('error getGroupRecordDetailByGroupId::' + arguments[0]);
									//alert('error getGroupRecordDetailByGroupId::' + arguments[1]);
									//alert('error getGroupRecordDetailByGroupId::' + arguments[2]);
								}
							};

							Util.fetchData(groupInfoParam);
						});
					} else {

					}
				},
				errorFn: function() {
					//alert('error tourMessage::' + arguments[0]);
					//alert('error tourMessage::' + arguments[1]);
					//alert('error tourMessage::' + arguments[2]);
				}
			};
			setTimeout(function (){
				Util.fetchData(groupStatusParam);
			}, 0);
		}
	}

	buildGroupList (data) {
		let groupList = data.map(function (item, index){
			return {
				url: item.userDTO.headImgURL,
				size: item.normalNum, 
				startTime: Util.formatTimestamp(item.payDate), 
				isLeader: index == 0
			};
		});

		return groupList;
	}

	componentWillReceiveProps(nextProps) {

	 	if (nextProps && nextProps.routeItem) {
	 		let routeItem = nextProps.routeItem;
	 		this.setState({
	 			routeItem : routeItem,
	 			remain: routeItem.remain,
	 			status: routeItem.status,
	 			endTime: new Date(routeItem.groupEndTime).getTime()
	 		}, () => {
	 			//console.log('update in group status', this.state);
	 		});
	 	}
	}

	handleBtnClickStretagy (clickType) {
		if (clickType != 'share') {
			Util.leavePage(function () {
				if (clickType == 'join') {
					Util.redirectPageByBuyType('group', location.href);
				} else {
					let openNewGroupUrl = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/FillInfo/index.html?isGroup=true';
					Util.redirectPageByBuyType(clickType, openNewGroupUrl);
				}
			});
			
		} else {
			this.refs.alertBox.showAlertBox('提示消息', '请点击右上角分享按钮进行分享');
		}
	}

	showErrorMessage (msg) {
		let that = this;
		that.setState({
			enter: true,
			'message': msg
		}, () => {
			setTimeout(function (){ 
				that.setState({
					enter: false
				});
			}, 2000);
		});
	}

	render () {
		let items = [];
		let {endTime, remain, list, status} = this.state;

		return (
			<div>
				<div>
					<RouteDetailHeader 
						imageList={this.state.routeDetail.imageList}/>
					<RouteDetailInfo 
						ref="routeDetailInfo"
						status={status}
						hasCountDown={this.state.hasCountDown} 
						remain={remain}
						endTime={endTime}
						list={list}/>
				</div>

				<RouteDetailExtendInfo 
					info={items} />

				<RouteDetailFooter 
					status={status}
					showErrorMessage={this.showErrorMessage.bind(this)}
					hasShareBtn={this.state.hasShareBtn} 
					handleBuy={this.handleBtnClickStretagy.bind(this)}/>

				<Alert ref="alertBox" />
				<Notification enter={this.state.enter} leave={this.leave.bind(this)}>{this.state.message}</Notification>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 50);