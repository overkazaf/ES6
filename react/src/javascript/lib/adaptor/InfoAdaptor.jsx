import Util from 'lib/util';

export default class InfoAdaptor {
	constructor (data) {
		console.log('raw data', data);
		this.data = this.transform(data);
	}

	getData () {
		console.log('InfoAdaptor', this.data);
		return this.data;
	}

	buildGroupInfo (data) {
		let travelTimeMap = {
			'1475251200000' : 0,
			'1475337600000' : 1,
			'1475424000000' : 2
		};
		let originPlaces = ['杭州', '上海', '南京'];

		return {
			groupSizes: ['6-9人', '10-12人', '12-15人'],
			originPlaces: originPlaces,
			leavedDates: ['10月1日', '10月2日', '10月3日'],
			//默认不选中
			selectedGroupSizeIndex: data.type, // 0:6-9人, 1:10-12人, 2:12-15人
			selectedOriginPlaceIndex: originPlaces.indexOf(data.travelAddress), // hz:杭州, sh:上海, nj:南京
			selectedLeavedDateIndex: travelTimeMap['' + (new Date(data.travelTime + ' 00:00:00').getTime())], //1001, 1002, 1003
			canSelect: true,
			leaveDays: 3
		}
	}

	transform (data) {

		let ret = {
			info : {
				group: this.buildGroupInfo(data),
				personInfo: this.buildPersonInfo(data),
				services: {
					guide: false,
					car: false,
					plain: !!data.meetAirport,
					ensurance: !!data.secure
				},
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