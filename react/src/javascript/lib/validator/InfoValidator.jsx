import Util from 'lib/util';
export default class InfoValidator {
	constructor (options) {
		this.options = options;
	}
	validate () {
		let {group, personInfo} = this.options;
		let ret = true, msg, retObj;
		if (group.selectedGroupSizeIndex == -1 || group.selectedOriginPlaceIndex == -1 || group.selectedLeavedDateIndex == -1) {
			if (group.selectedGroupSizeIndex == -1) {
				ret = false;
				msg = '请选择开团人数';
				retObj = {
					success: ret,
					message: msg
				};

				return retObj;
			}


			if (group.selectedOriginPlaceIndex == -1) {
				// 如果是开团的情况
				ret = false;
				msg = '请选择出发地';
				retObj = {
					success: ret,
					message: msg
				};

				return retObj;
			}

			if (group.selectedLeavedDateIndex == -1) {
				// 如果是开团的情况
				ret = false;
				msg = '请选择出行日期';
				retObj = {
					success: ret,
					message: msg
				};

				return retObj;

			}
		}

		// 校验主要联系人的信息
		let main = personInfo.adult.main;
		let isEmpty = function (str) {
			return Util.trim(str) == '';
		};
		

		if (isEmpty(main.name)) {
			ret = false;
			msg = '联系人名字为空';
			retObj = {
				success: ret,
				message: msg
			};

			return retObj;
		}


		if (isEmpty(main.id)) {
			ret = false;
			msg = '联系人身份证号码为空';
			retObj = {
				success: ret,
				message: msg
			};

			return retObj;
		} else if (Util.trim(main.id) != ''){
			let id = Util.trim(main.id);
			let reID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if (!reID.test(id)) {
				ret = false;
				msg = '联系人身份证号码格式非法';
				retObj = {
					success: ret,
					message: msg
				};
				return retObj;
			}
		}

		if (isEmpty(main.phone)) {
			ret = false;
			msg = '联系人手机号码为空';
			retObj = {
				success: ret,
				message: msg
			};

			return retObj;
		} else if (Util.trim(main.phone)){
			let phone = Util.trim(main.phone);
			let rePhone = /^1\d{10}$/;
			if (!rePhone.test(phone)) {
				ret = false;
				msg = '联系人手机号码格式非法';
				retObj = {
					success: ret,
					message: msg
				};
				return retObj;
			}
		}

		// 如果存在多个联系人， 同样要做校验处理

		retObj = {
			message : '校验通过',
			success : true
		};

		return retObj;
	}
}