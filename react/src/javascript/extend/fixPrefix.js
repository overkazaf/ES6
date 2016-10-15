/**
 * [hookAndFixUrlPrefix 临时处理的钩子函数，用于替换数据结构中的特定前缀，后期将图片往OSS中放就不需要做这个hook了]
 * @Author   JohnNong
 * @Email    overkazaf@gmail.com
 * @Github   https://github.com/overkazaf
 * @DateTime 2016-10-15T00:04:02+0800
 * @param    {[type]}                     json [description]
 * @return   {[type]}                          [description]
 */
function hookAndFixUrlPrefix (json) {
	return dsf(json, fixString);
}

/**
 * [isArray 判断是否为数据的工具方法]
 * @Author   JohnNong
 * @Email    overkazaf@gmail.com
 * @Github   https://github.com/overkazaf
 * @DateTime 2016-10-15T00:04:52+0800
 * @param    {[type]}                     obj [description]
 * @return   {Boolean}                        [description]
 */
function isArray (obj) {
	if (typeof Array.isArray == 'function') return Array.isArray(obj);
	return obj instanceof Array || Object.prototype.toString.call(obj) == '[object Array]';
}

/**
 * [dfs 用深度优先的递归进行处理]
 * @Author   JohnNong
 * @Email    overkazaf@gmail.com
 * @Github   https://github.com/overkazaf
 * @DateTime 2016-10-15T00:05:05+0800
 * @param    {[type]}                     obj [description]
 * @return   {[type]}                         [description]
 */
function dfs (obj, fn) {
	if (typeof obj != 'object') {
		// 基本数据类型
		if (typeof obj == 'string') return fn(obj);
		else return obj;
	}
	
	var ret = new obj.constructor();
	if (isArray(obj)) {
		for (var i = 0, l = obj.length; i<l; i++) {
			ret[i] = dfs(obj[i], fn);
		}
	} else {
		for (var attr in obj) {
			console.log(attr, typeof obj[attr]);
			if (obj.hasOwnProperty(attr)) {
				ret[attr] = dfs(obj[attr], fn);
			}
		}
	}
	return ret;
}

var pattern = 'fightgroup-web/public/';
var prefix = 'http://localhost:8090/fightgroup-web/public/';

function fixStringByPattern (str, pattern, prefix) {
	var target = str;
	if (target.indexOf(pattern) >= 0) {
		var subfix = target.split(pattern)[1];
		target = prefix + subfix;
	}
	return target;
}


var testData = {
    "banner": [
        "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/swim/bannerNew1@3x.png",
        "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/swim/bannerNew2@3x.png",
        "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/swim/bannerNew3@3x.png",
        "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/swim/bannerNew4@3x.png"
    ],
    "description": {
        "feature": {
            "headImage": "aaa.jpg",
            "imageUrl": "feature.jpg",
            "name": "产品特色"
        },
        "fee": {
            "headImage": "aaa.jpg",
            "imageUrl": "fee.jpg",
            "name": "费用说明"
        },
        "routing": {
            "headImage": "aaa.jpg",
            "imageUrl": "",
            "name": "行程安排",
            "scheduleDescriptions": [
                {
                    "dayName": "第一天",
                    "id": 1,
                    "placeDescriptions": [
                        {
                            "placeDesc": "水里“疯”个够",
                            "placeIcon": "xxx.jpg",
                            "placeIconClazz": "icon-1",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/drift/banner1@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/drift/banner2@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/drift/banner3@3x.png"
                            ],
                            "placeName": "九龙溪漂流"
                        },
                        {
                            "placeDesc": "体验千岛民俗独特韵味",
                            "placeIcon": "yyy.jpg",
                            "placeIconClazz": "icon-2",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/station/station1@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/station/station2@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/station/station3@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/station/station4@3x.jpg"
                            ],
                            "placeName": "风铃驿站"
                        },
                        {
                            "placeDesc": "千岛湖鱼头美味",
                            "placeIcon": "yyy.jpg",
                            "placeIconClazz": "icon-3",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/food/banner2@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/food/banner3@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/food/banner4@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/food/banner5@3x.png"
                            ],
                            "placeName": "推荐：风铃驿站农家菜"
                        }
                    ]
                },
                {
                    "dayName": "第二天",
                    "id": 2,
                    "placeDescriptions": [
                        {
                            "placeDesc": "中国的濑户内海",
                            "placeIcon": "xxx.jpg",
                            "placeIconClazz": "icon-1",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/road/banner1@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/road/banner2@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/road/banner3@3x.png"
                            ],
                            "placeName": "推荐：千汾公路观光"
                        },
                        {
                            "placeDesc": "探寻千年水下古城",
                            "placeIcon": "yyy.jpg",
                            "placeIconClazz": "icon-1",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/city/city1@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/city/city2@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/city/city3@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/city/city4@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/city/city5@3x.jpg"
                            ],
                            "placeName": "文渊狮城"
                        },
                        {
                            "placeDesc": "徽式庭院豪华别墅房　中式风格五星级酒店",
                            "placeIcon": "yyy.jpg",
                            "placeIconClazz": "icon-3",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/hotel/hotel1@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/hotel/hotel2@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/hotel/hotel3@3x.jpg",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/hotel/hotel4@3x.jpg"
                            ],
                            "placeName": "铂瑞酒店"
                        }
                    ]
                },
                {
                    "dayName": "第三天",
                    "id": 3,
                    "placeDescriptions": [
                        {
                            "placeDesc": "欣赏“湖中有岛，岛中有湖”的胜景",
                            "placeIcon": "xxx.jpg",
                            "placeIconClazz": "icon-1",
                            "placeImageList": [
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/lake/banner1@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/lake/banner2@3x.png",
                                "E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteDetail//places/lake/banner3@3x.png"
                            ],
                            "placeName": "龙川湾"
                        }
                    ]
                }
            ]
        }
    },
    "route": {
        "description": "国庆避开人群，邂逅千岛湖一处静谧之地，狮柏瑞酒店，给你一个安静舒心的旅行度假体验",
        "feeList": {
        	"a":[
        		"b","c"
        	]
        },
        "fightGroupPrice": 655,
        "id": 1,
        "name": "\r\n千岛湖国庆家庭主题3日游",
        "singlePrice": 990,
        "status": 1
    }
}

function test () {
	console.log(hookAndFixUrlPrefix(testData));
}


test();