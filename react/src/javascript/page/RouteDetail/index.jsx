import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'components/Gallery/Gallery';
import Util from 'lib/util.jsx';
import WeixinUtil from 'lib/WeixinUtil';
import ShareConfig from 'lib/share/config.js';
import Header from 'components/Header/Header';
import RouteDetailHeader from 'components/RouteDetail/RouteDetailHeader';
import RouteDetailInfo from 'components/RouteDetail/RouteDetailInfo';
import RouteDetailFooter from 'components/RouteDetail/RouteDetailFooter';
import RouteDetailExtendInfo from 'components/RouteDetail/RouteDetailExtendInfo';
import 'scss/base.scss';
import 'scss/RouteDetail/index.scss';


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			routeDetail : {
				imageList : [
					'../../../res/images/RouteDetail/places/banner/banner1@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner2@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner3@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner4@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner5@3x.jpg',
			        '../../../res/images/RouteDetail/places/banner/banner6@3x.jpg'
				]
			}
		};
	}

	componentDidMount() {
     Util.inPage();
     Util.addUserPageInfoUploadListener();
	 let that = this;
	 setTimeout(function (){
	 	that.initShare();
	 }, 50);     
	}


	initShare () {
		let sharedNewGroupSuccParam = {
			url: 'logger/printUserShareInfo',
			data: {
				userId: Util.getCurrentUserId(),
				url: ShareConfig['newGroup']().getLink(),
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
			//window.ShareConfig = ShareConfig;
			
			WeixinUtil.share2Friends({
				title: ShareConfig['newGroup']().getTitle(),
				link: ShareConfig['newGroup']().getLink(),
				imgUrl: ShareConfig['newGroup']().getSharedImgUrl(),
				desc: ShareConfig['newGroup']().getDesc(),
				success: function () {
					//alert('intercept share2Friends successfully');
					Util.fetchData(sharedNewGroupSuccParam);
				},
				cancel: function () {
					//alert('cancel share2Friends successfully');
				}
			});

			WeixinUtil.share2FriendCircle({
				title: ShareConfig['newGroup']().getTitle(),
				link: ShareConfig['newGroup']().getLink(),
				imgUrl: ShareConfig['newGroup']().getSharedImgUrl(),
				desc: ShareConfig['newGroup']().getDesc(),
				success: function(){
					//alert('intercept share2FriendCircle successfully');
					Util.fetchData(sharedNewGroupSuccParam);
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

	handleBuyStretagy (buyType) {

		Util.leavePage(function () {
			Util.redirectPageByBuyType(buyType);
		});
	}

	render () {
		let items = [];

		return (
			<div>
				<div>
					<RouteDetailHeader imageList={this.state.routeDetail.imageList}/>
					<RouteDetailInfo info={this.state.routeDetail}/>
				</div>
				<RouteDetailExtendInfo info={items} />
				<RouteDetailFooter handleBuy={this.handleBuyStretagy}/>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);