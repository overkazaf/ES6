import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'lib/hammer.min.js';
import Util from 'extend/util';
import WeixinUtil from 'extend/WeixinUtil';
import RouteItemList from 'components/RouteItemList/RouteItemList';
import Tab from 'components/Tab/Tab';
import 'scss/base.scss';
import 'scss/RouteList/index.scss';

class MyComponent extends Component {

	constructor (props) {
		super(props);

		this.state = {
			tabTree: {
				activeIndex : 0,
				items : [
					{
						label: '拼团',
						display: true,
						activeIndex: 0,
						items: [
							{
								label: '全部行程',
								display: true,
								items: null
							},
							{
								label: '待支付',
								display: true,
								items: null
							},
							{
								label: '拼团中',
								display: true,
								items: null
							},
							{
								label: '已成团',
								display: true,
								items: null
							},
							{
								label: '拼团失败',
								display: true,
								items: null
							},
						]
					},
					{
						label: '单独购买',
						display: true,
						activeIndex: 0,
						items: [
							{
								label: '全部行程',
								display: true,
								items: null
							},
							{
								label: '待支付',
								display: true,
								items: null
							},
							{
								label: '已完成',
								display: true,
								items: null
							},
							{
								label: '已取消',
								display: true,
								items: null
							},
						]
					}
				]
			},
			currentTabItems : [] // 存放当前展示的tab对象，后期做滚动加载
		};
	}

	componentDidMount () {
		Util.inPage();
		// 未授权的走授权，然后取userId
		let userId = Util.getCurrentUserId() || Util.fetchParamValueByCurrentURL('user');
		if (!userId) {
			let href = location.href;
			let authUrl = 'http://yougo.xinguang.com/fightgroup-web/oauth/gotoOauth?redirect_param='+href+'&thirdPartType=weixin';
			location.href = authUrl;
		} else {
			Util.setCurrentUserId(userId);
		}
		
		let that = this;
		that.initHide();
		that.resetRouteList(0, 0);
		Util.addUserPageInfoUploadListener();
	}

	initHide () {
		WeixinUtil.initWeixinJSBridge(function () {
			WeixinUtil.hideOptionMenu();
		});
	}

	resetRouteList (topIndex, subIndex) {
		let that = this;
		//　定义一个状态数组，用于映射拼团和单独购买的子状态
        let statusArray = [
        	[0,1,2,3,4], // 拼团，0为全部行程 1为待支付 2为拼团中 3为已成团 4为拼团失败
        	[0,2,3,4] //单独购买，0为全部行程 2为待支付 3成功 4为取消
        ];
		let param = {
			url : 'tour/myTour',
			method : 'get',
			data : {
				status: statusArray[topIndex][subIndex],
				userId: Util.getCurrentUserId(),
				type: topIndex+1
			},
			successFn : function (result) {                
                if (Util.isResultSuccessful(result.success)) {
                    let newItems = that.rebuildRouteListState.call(that, result.data);

                    that.setState({
		                currentTabItems : newItems
		            }, ()=>{
		                console.log('after setting new Items', that.state);
		            });
                }
			},
			errorFn : function () {
				console.error(arguments);
			}
		};

		Util.fetchData(param);
	}

    rebuildRouteListState (data) {
        return data.map(function (item, index){
            return Util.rebuildItemState(item);  
        });
    }

	handleSubTabChange (item, index) {

		let ctx = this.context;
		let clonedTabTree = Util.deepClone(ctx.state.tabTree);

		clonedTabTree.items.activeIndex = index;

		ctx.setState({
			tabTree : clonedTabTree,
			currentTabItems : []
		});
		ctx.resetRouteList(clonedTabTree.activeIndex, index);
		
	}


	handleTopTabChange (item, index) {
		let ctx = this.context;
		let clonedTabTree = Util.deepClone(ctx.state.tabTree);
		clonedTabTree.activeIndex = index;
		ctx.setState({
			tabTree : clonedTabTree,
			currentTabItems : []
		}, ()=>{
			ctx.resetRouteList(index, 0);

			// 修正子tab的bar位移及长度
			ctx.refs['subTab'].init(0);
		});
		
	}

	render () {
		let that = this;
		let {tabTree, currentTabItems} = this.state;

		// top tab menu status
		let topTabActiveIndex = tabTree.activeIndex;
		let topTabItems = tabTree.items;
		let topTabStatus = topTabItems.map(function (item, index){
			return item.label;
		}).filter(function (item) {
			return !item.display;
		});



		// sub tab menu status
		let subTabItem = topTabItems[topTabActiveIndex];

		let subTabActiveIndex = subTabItem.activeIndex;
		let subTabStatus = subTabItem.items.map(function (item, index){
			return item.label;
		}).filter(function (item){
			return !item.display;
		});

		return (
			<div className="m-route-detail">
				<div className="m-route-header">
					<Tab 
						ref="topTab"
						isTopTab={true}
						tabs={topTabStatus} 
						activeIndex={topTabActiveIndex}
						context={that}
						handleItemClick={this.handleTopTabChange}
					/>
				</div>
				<div className="m-route-body">
					<Tab 
						ref="subTab"
						tabs={subTabStatus} 
						activeIndex={subTabActiveIndex}
						context={that}
						handleItemClick={this.handleSubTabChange}
						/>
					<RouteItemList items={currentTabItems} />
				</div>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(< MyComponent / > , document.getElementById("app"));
}

setTimeout(doRender, 50);