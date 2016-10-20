import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'components/Gallery/Gallery';
import Util from 'extend/util';
import Hook from 'extend/hook';
import WeixinUtil from 'extend/WeixinUtil';
import ShareConfig from "extend/WeixinUtil";
import Header from 'components/Header/Header';
import RouteDetailHeader from 'components/RouteDetail/RouteDetailHeader';
import RouteDetailInfo from 'components/RouteDetail/RouteDetailInfo';
import RouteDetailFooter from 'components/RouteDetail/RouteDetailFooter';
import RouteDetailExtendInfo from 'components/RouteDetail/RouteDetailExtendInfo';
import {RouteInfoAdaptor} from 'extend/adaptor/InfoAdaptor';
import 'scss/base.scss';
import 'scss/RouteDetail/index.scss';


class MyComponent extends Component {
	constructor (props) {
		super(props);

		let defaults = {
			routeDetail : {
				imageList : []
			},
			detailInfo : {
				"description": "",
				"feeList": "",
				"fightGroupPrice": 0,
				"id": 1,
				"name": "",
				"singlePrice": 0,
				"status": 1
			},
			extendInfo : {
				activeIndex : 0,
				tabStatus : ['行程安排', '产品特色', '费用说明'],
				currentTabItems : [
					{
						href: '#schedule',
						name: '行程安排',
						headImage : '',
						scheduleList : [
						// {
						// 	id: 1,
						// 	dayName: '第一天',
						// 	placeList : [
						// 	{
						// 		placeName: "九龙溪漂流",
						// 		placeDesc: "水里“疯”个够",
						// 		placeIconClazz: 'icon-1',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','',''] 
						// 	},
						// 	{
						// 		placeName: "风铃驿站",
						// 		placeDesc: "体验千岛民俗独特韵味",
						// 		placeIconClazz: 'icon-2',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','','']
						// 	},
						// 	{
						// 		placeName: "推荐：风铃驿站农家菜",
						// 		placeDesc: "千岛湖鱼头美味",
						// 		placeIconClazz: 'icon-3',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','','']
						// 	}
						// 	]
						// },
						// {
						// 	id: 2,
						// 	dayName: '第二天',
						// 	placeList : [
						// 	{
						// 		placeName: "推荐：千汾公路观光",
						// 		placeDesc: "中国的濑户内海",
						// 		placeIconClazz: 'icon-1',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','','']
						// 	},
						// 	{
						// 		placeName: "文渊狮城",
						// 		placeDesc: "探寻千年水下古城",
						// 		placeIconClazz: 'icon-1',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','','']
						// 	},
						// 	{
						// 		placeName: "铂瑞酒店",
						// 		placeDesc: "徽式庭院豪华别墅房　中式风格五星级酒店",
						// 		placeIconClazz: 'icon-3',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','','']
						// 	}
						// 	]
						// },
						// {
						// 	id: 3,
						// 	dayName: '第三天',
						// 	placeList : [							
						// 	{
						// 		placeName: "龙川湾",
						// 		placeDesc: "欣赏“湖中有岛，岛中有湖”的胜景",
						// 		placeIconClazz: 'icon-1',
						// 		placeIcon: '',
						// 		placeImageList : [ '','','','','']
						// 	}
						// 	]
						// } 
						]
					},
					{
						href: '#feature',
						name: '产品特色',
						headImage : '',
						imageUrl : ''
					},
					{
						href: '#fee',
						name: '费用说明',
						headImage : '',
						imageUrl : ''
					}
				]
			}
		}
		this.state = defaults;

	}

	componentDidMount() {
		Util.inPage();
		Util.addUserPageInfoUploadListener();
		let that = this;

		let getGroupInfoParam = {
			url: 'route/queryTrip',
			method: 'get',
			data: {
				id: Util.fetchParamValueByCurrentURL("routeId")
			},
			successFn :function(result) {
				if (Util.isResultSuccessful(result)) {
					let json = result.data;
						
					json = Hook.hookAndFixUrlPrefix(json);

					let routeInfoAdaptor = new RouteInfoAdaptor(json);
					let routeInfo =  routeInfoAdaptor.getData();

					// 动态修改标题
					$(document).attr('title', json.route.name); 

					that.setState({
						routeDetail : {
							imageList : routeInfo.banner
						},
						detailInfo : routeInfo.detailInfo,
						extendInfo : routeInfo.extendInfo
					});
				}else{
					console.log('routeDetail msg get ERROR!')
				}
			},
			errorFn : function () {
				console.error(arguments);
			}
		}
		Util.fetchData(getGroupInfoParam);
	}

	
	handleBuyStretagy (buyType) {
		Util.leavePage(function () {
			Util.redirectPageByBuyType(buyType);
		});
	}

	render () {
		return (
			<div>
				<div>
					<RouteDetailHeader imageList={this.state.routeDetail.imageList}/>
					<RouteDetailInfo info={this.state.detailInfo}/>
				</div>
				<RouteDetailExtendInfo info={this.state.extendInfo} />
				<RouteDetailFooter singlePrice={this.state.detailInfo.singlePrice} handleBuy={this.handleBuyStretagy}/>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);