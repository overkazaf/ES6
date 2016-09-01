import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Hammer from 'lib/hammer.min.js'
import Util from 'lib/util'
import Header from 'components/Header/Header'
import RouteItemList from 'components/RouteItemList/RouteItemList'
import Tab from 'components/Tab/Tab'
import 'scss/base.scss'
import 'scss/RouteList/index.scss'

class MyComponent extends Component {

	constructor (props) {
		super(props);

		this.state = {
			headerTitle : '我的行程',
			activeIndex : 0,
			tabStatus : ['全部行程', '拼团中', '已成团', '拼团失败'],
			currentTabItems : [
				{
					"price" : 1234.12,
					"name" : "route1",
					"groupMemberNumber" : "3",
					"groupStartTime" : "2016-10-08 20:30:14"
				},
				{
					"price" : 1234.12,
					"name" : "route2",
					"groupMemberNumber" : "2",
					"groupStartTime" : "2016-10-08 20:34:14"
				},
				{
					"price" : 1234.12,
					"name" : "route3",
					"groupMemberNumber" : "3",
					"groupStartTime" : "2016-10-08 20:31:14"
				},
				{
					"price" : 1234.12,
					"name" : "route4",
					"groupMemberNumber" : "1",
					"groupStartTime" : "2016-10-08 20:50:14"
				}
			]
		};
	}

	componentsDidMount () {
		this.resetRouteList();
	}

	resetRouteList (index) {
		let param = {
			url : 'route-list.json',
			successFn : function (result) {
				console.log("success");
				console.log(result);
			},
			errorFn : function () {
				console.error(arguments);
			}
		};

		Util.fetchData(param);
	}

	handleTabChange (item, index) {
		let ctx = this.context;
		ctx.setState({
			activeIndex : index,
			currentTabItems : []
		});
		ctx.resetRouteList(index);
	}


	render () {
		let that = this;
		const {headerTitle, activeIndex, tabStatus, currentTabItems} = this.state;

		return (
			<div>
				<Header title={headerTitle} />
				<div className="m-route-body">
					<Tab 
						tabs={tabStatus} 
						activeIndex={activeIndex}
						context={that}
						handleItemClick={this.handleTabChange}
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