import AlgorithmBase from './base';

export default class RouteAlgorithm extends AlgorithmBase {
	constructor (props) {
		super(props);
	}

	static calculateStrategy = {
		'fightGroup': function (data) {
			let getResult = function calc(info){
				return 1100;
			};

			return new Number(getResult(data)).toFixed(2);
		},
		'singleBuy' : function (data) {
			let getResult = function calc(info){
				// implement the main calc function here
				// 
				// 
				// 
				return 0;
			};

			return new Number(getResult(data)).toFixed(2);
		}
	};

	static validate (result) {
		//　子类必须重写这个校验方法 ，强制对返回的结果进行校验
		//　这里测试未完成先直接返回结果
		return result;
	}

	static calculate (options) {
		return calculateStrategy[options.type](options.data);
	}
}