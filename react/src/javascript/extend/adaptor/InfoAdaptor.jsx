import Util from 'extend/util';

export default class InfoAdaptor {
	constructor (data) {
		this.data = this.transform(data);
	}

	getData () {
		return this.data;
	}

	postProcessData (form) {
		let newBasicInfoForm = Util.deepClone(form);
		let groupSizeEl = newBasicInfoForm.filter(function (item) {
			return item.name == 'groupSize';
		});

		groupSizeEl.display = Util.isGroup() || Util.isJoined();
		groupSizeEl.isRequired = groupSizeEl.display;

		return newBasicInfoForm;
	}

	static buildJoinedBasicInfoFromHistorialData (json, oldBasicInfoForm) {
		let newBasicInfoForm = Util.deepClone(oldBasicInfoForm);

		newBasicInfoForm.map(function (item, index){
			switch(item.name) {
				case 'groupSize':
					item['currentValue'] = json.userMinAmount + '-' + json.userMaxAmount;
					break;
				case 'travelPlace':
					item['currentValue'] = json.travelAddress;
					break;
				case 'travelDate':
					item['currentValue'] = DateUtil.formatDate(json.travelTime, 'yyyy-MM-dd');
					break;
			}
			return item;
		});

		// 处理这个表单字段，如果是隐藏的，则修改其isRequired位，在做表单校验时不需要处理
		newBasicInfoForm = InfoAdaptor.postProcessData(newBasicInfoForm);

		return {
			canSelect: false,
			isGroup: Util.isGroup(),
			form: newBasicInfoForm
		};
	}

	transform (data) {
		let formData = require('mock/fill-info.json').data.conditions;
		let ret = {
			info : {
				basicInfo: this.buildJoinedBasicInfoFromHistorialData(data, formData),
				personInfo: this.buildPersonInfo(data),
				services: {
					guide: false,
					car: false,
					plain: !!data.meetAirport,
					ensurance: !!data.secure
				},
				feeList: data.feeList,
				price: {
					adult: 899.00,
					kid: 270.00,
					payPrice: data.payPrice
				}
			},
			isGroup: Util.isGroup(),
  		 	isFirst: true,
			enter: false,
			isJoined: false,
			maxAdultValue: 15,
			canSubmit: false,
			message: ''
		};
		return ret;
	}

	buildPersonInfo (data) {

		let buildAdultInfo = function (json) {
			let userDetail = JSON.parse(json.userDetail);

			let mainData = {
				phone: json.phone,
				name: userDetail[0].name,
				id: userDetail[0].cardNo
			};

			userDetail.splice(0,1);

			let extraData = userDetail.map(function (item, index){
				return {
					name: item.name || "",
					id: item.cardNo || ""
				}
			});

			let info = {
				count: json.normalNum,
				main: mainData,
				extra: extraData
			};

			return info;
		};

		let buildKidInfo = function (json) {
			let info = {
				count: json.specialNum
			};
			return info;
		}

		let personInfo = {
			adult : buildAdultInfo(data),
			kid: buildKidInfo(data)
		};

		return personInfo;
	}
};

export class RouteInfoAdaptor {
	constructor (data) {
		this.data = this.transform(data);
	}

	getData () {
		return this.data;
	}

	transform (data) {
		let routeDetailInfo = {
			banner: data.description.banner,
			detailInfo: data.route,
			extendInfo: this.buildExtendInfo(data.description)
		}
		return routeDetailInfo;
	}

	buildExtendInfo (data) {
		//获取'行程安排', '产品特色', '费用说明'具体信息
		let buildTabItems = function (data) {
			console.log('data', data);
			let  tmpScheduleList= [];
			data.routing.scheduleDescriptions.map(function (item,index) {
				tmpScheduleList.push({
					dayName: item.dayName,
					id: item.id,
					placeList: item.placeDescriptions
				});
			});
			let tmpRouting = {
				name: data.routing.name,
				headImage : data.routing.headImage,
				scheduleList : tmpScheduleList
			}

			let  currentTabItems= [tmpRouting,data.feature,data.fee];

			currentTabItems[0].href = '#schedule';
			currentTabItems[1].href = '#feature';
			currentTabItems[2].href = '#fee';

			return currentTabItems;
		}

		//RouteDetail下ExtendInfo汇总
		let extdAdaptor = {
			activeIndex : 0,
			tabStatus : [data.routing.name,data.feature.name,data.fee.name],
			currentTabItems : buildTabItems(data)
		}

		return extdAdaptor;
	}
}
