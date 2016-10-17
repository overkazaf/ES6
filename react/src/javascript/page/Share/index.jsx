import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GroupStatus from 'components/GroupStatus/GroupStatus';
import ShareModal from 'components/ShareModal/ShareModal';
import Util from "extend/util";
import Status from "extend/status";
import ShareConfig from "extend/WeixinUtil";
import WeixinUtil from "extend/WeixinUtil";
import 'scss/base.scss';
import 'scss/GroupStatus/index.scss';
import 'scss/Share/index.scss';

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
			},
			status: 0,
			routeItem : {},
			remain: 0
		};
	}

	componentDidMount () {
		Util.inPage();
		Util.addUserPageInfoUploadListener();

		let that = this;
		let detailId = Util.parseQueryString(location.href)['detailId'];
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
							remain: newState.remain,
							status: newState.status
						}, ()=>{
							//console.log('routeItem has been updated successfully',newState);
							that.initShare(detailId, newState.groupId, newState.remain, newState.price);
							//alert('share');
							that.refs['groupStatus'].updateStatus(newState.status);
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

	initShare (detailId, sharedGroupId, remain, price) {
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
		let list = [];
		let {isShown, modalTpl} = this.state.modal;
		let {routeItem, remain, status} = this.state;
		let shareBtn;

		if (status == Status.getStatusCodes().SUCCESS) {
			shareBtn = <div className="invite-btn disabled">
							拼团成功，美好行程即将到来
						</div>
		} else {
			shareBtn = <div className="invite-btn" onClick={this.handleShare.bind(this)}>
							邀请好友来参团
						</div>
		}

		return (
			<div className="m-group-info">
				<GroupStatus 
					ref="groupStatus"
					status={status}
					remain={remain}
					routeItem={routeItem} 
					list={list}/>
				<ShareModal isShown={isShown} modalTpl={modalTpl} />
				{shareBtn}
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);