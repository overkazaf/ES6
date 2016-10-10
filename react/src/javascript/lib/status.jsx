export default class Status {
	static getStatusCodes () {
		return {
			'ALL': 0,　// 所有状态
			'PENDING': 2, // 预支付
			'RUNNING': 3, //　拼团中
			'SUCCESS': 4, // 已成团
			'FAIL': 5 // 已失败
		};

		/*
			return {}
		 */
	}
}