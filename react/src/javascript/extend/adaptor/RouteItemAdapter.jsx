import Util from 'extend/util';
export default class RouteItemAdaptor {
	static rebuildItemState (item) {
		let kidCount = +item.specialNum;
        let adultCount = +item.normalNum;
        let totalCount = kidCount + adultCount;
        return   {
            "groupId": item.groupId,
            "id": item.id,
			"price" : new Number(item.payPrice).toFixed(2),
			"name" : "千岛湖国庆家庭3日游",
			"groupMemberNumber" :  totalCount,
            "kid": kidCount,
            "adult": adultCount,
            "payStatus": item.payStatus,
            "status": item.status,
            "remain": item.remainAmount,
			"groupStartTime" : Util.formatTimestamp(item.startTime),
			"groupEndTime" : item.endTime,
            "travelTime": item.travelTime,
            "type": item.type, // 1为拼团购买，2为单独购买
            "travelAddress": item.travelAddress
		} 
	}
}