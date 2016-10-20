import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Util from 'extend/util';
import WeixinUtil from 'extend/WeixinUtil';
import InfoForm from 'components/InfoForm/InfoForm';
import InfoAdaptor from 'extend/adaptor/InfoAdaptor';
import 'scss/base.scss';
import 'scss/FillInfo/index.scss';


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			formData : null,
			feeList: null,
			ticket: null,
			hotels: null
		};

		if (typeof __ftlData__ != 'undefined') {
			// freeMarker case
			let adaptor = new InfoAdaptor(__ftlData__);
			this.state = {
				data: adaptor.getData()
			};
		}
	}

	componentDidMount () {
		Util.inPage();
		let that = this;
		let userId = Util.fetchParamValueByCurrentURL("user");
		if (userId) {
			Util.setCurrentUserId(userId);
		}

		WeixinUtil.initWeixinJSBridge(function(config){
			WeixinUtil.hideOptionMenu();
		});
		Util.fixFixed();
		Util.addUserPageInfoUploadListener();

		// 获取该路线下的参数
		let getRouteParamOption = {
			url: 'tour/queryRouteItem',
			method: 'get',
			data: {
				routeId: Util.fetchParamValueByCurrentURL("routeId")
			},
			successFn: function (result) {
				if (Util.isResultSuccessful(result.success)) {
					// let routeParamData = JSON.parse(result.data);
					let routeParamData = result.data;
					that.setState({
						formData: {
							canSelect: true,
							form: routeParamData.conditions,
							isGroup: Util.isGroup()
						},
						feeList: {
							includes: routeParamData.includes,
							excludes: routeParamData.excludes
						},
						ticket: routeParamData.ticket,
						hotels: routeParamData.hotels
					});

					console.log('routeParamData', routeParamData);
				}
			},
			errorFn: function () {
				console.error.apply(this, [...arguments]);
			}
		};
		Util.fetchData(getRouteParamOption);
	}

	render () {
		let infoData = typeof __ftlData__ == 'undefined' ? null : this.state.data;
		let {formData, feeList, ticket, hotels} = this.state;

		if (!formData) {
			return (
				<div></div>
			);
		} else {
			return (
				<div className="m-fill-info">
					<InfoForm 
						form={formData}
						info={infoData}
						feeList={feeList}
						ticket={ticket}
						hotels={hotels}
					/>
				</div>
			)
		}
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);