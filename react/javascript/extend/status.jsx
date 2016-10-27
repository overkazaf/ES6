export default class Status {
	static getStatusCodes () {
		return {
			'1' : {　// 拼团
				'ALL': 0,　// 所有状态
				'PENDING': 1, // 待支付
				'RUNNING': 2, //　拼团中
				'SUCCESS': 3, // 已成团
				'FAIL': 4 // 已失败
			},
			'2' : { // 单独购买
				'ALL': 0,　// 所有状态
				'INIT': 1, // 初始化
				'PENDING': 2, // 待支付
				'SUCCESS': 3, //　成功
				'CANCEL': 4 // 取消
			}
		}
	}
}