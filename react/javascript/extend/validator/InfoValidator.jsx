import Util from 'extend/util';
export default class InfoValidator {
	constructor (options) {
		this.options = options;
	}

	/**
	 * [validateByRule 提供了常用的校验规则]
	 * @param  {[type]} option [description]
	 * @return {[type]}        [description]
	 */
	static validateByRule (option) {
		let rules = {
			'notNull': function (value, opt) {
				return typeof value != 'undefined' && Util.trim(value) != '';
			},
			'isMobile': function (value, opt) {
				let reMobile = /^1\d{10}$/;
				return reMobile.test(value);
			},
			'isID': function (value, opt) {
				let reID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				return reID.test(value);
			}
		};


		let {
			type, param, errorMessage, data
		} = option;


		let successFlag = rules[type](data.currentValue, data);
		return {
			success: successFlag,
			message: successFlag?'':errorMessage
		}
	}


	static validInfoByFormatedForm (form) {
		for (let i = 0, el; el = form[i++];) {
			let rules = el.validateRules;

			if (!el.isRequired) continue;

			for (let j = 0, rule; rule = rules[j++];) {
				let currentResult = InfoValidator.validateByRule({
					type: rule.rule,
					param: rule.param,
					errorMessage: rule.errorMessage,
					data: el
				});

				if (!currentResult.success) {
					return currentResult;
				}
			}
		}

		return {
			success: true,
			message: '校验通过'
		};
	}

	static validateBasicInfo (basicInfo) {
		let form = basicInfo.form;
		if (form) {
			return InfoValidator.validInfoByFormatedForm(form);
		} else {
			return {
				success: true,
				message: '无表单数据，校验失败'
			};
		}
	} 

	static validatePersonInfo (personInfo) {
		let composePersonForm = function (info){
			let arr = [];
			let adult = info.adult;
			let {main, extra} = adult;
			let persons = Util.deepClone(extra);
			persons.unshift({
				name: main.name,
				id: main.id
			});

			// 依待校验的格式处理人员信息
			persons.map(function (person, index){
				arr.push({
					currentValue: person.name,
					isRequired: true,
					validateRules: [
						{ "rule": "notNull","param":{}, "errorMessage": "用户名不能为空", data: {"currentValue": person.name}},
					]
				});

				arr.push({
					currentValue: person.id,
					isRequired: true,
					validateRules: [
						{ "rule": "notNull","param":{}, "errorMessage": "身份证号码不能为空", data: {"currentValue": person.id}},
						{ "rule": "isID","param":{}, "errorMessage": "身份证号码非法", data: {"currentValue": person.id}}
					]
				});
			});

			// 依待校验的格式处理联系电话
			arr.push({
				currentValue: main.phone,
				isRequired: true,
				validateRules: [
					{ "rule": "notNull","param":{}, "errorMessage": "联系电话不能为空", data: {"currentValue": main.phone}},
					{ "rule": "isMobile","param":{}, "errorMessage": "联系电话格式非法", data: {"currentValue": main.phone}}
				]
			});

			return arr;
		};
		return InfoValidator.validInfoByFormatedForm(composePersonForm(personInfo));
	}

	validate () {
		let {basicInfo, personInfo} = this.options;
		let basicInfoResult = InfoValidator.validateBasicInfo(basicInfo);
		if (!basicInfoResult.success) {
			return basicInfoResult;
		}

		let personInfoResult = InfoValidator.validatePersonInfo(personInfo);
		if (!personInfoResult.success){
			return personInfoResult;
		}

		return {
			success: true,
			message: '校验通过'
		};
	}
}