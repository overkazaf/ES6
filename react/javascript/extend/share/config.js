let shareStrategy = {
	'newGroup': function () {
		// 新开团的分享策略
		return {
			getTitle: function () {
				// 微信分享的标题
				let builtTitle =  '旅行竟然可以这么玩？￥998千岛湖三日两晚拼团自驾游';
				return builtTitle;
			},
			getDesc: function (remain) {
				// 微信分享描述信息
				let desc;
				if (remain) {
					desc = '[还差'+remain+'人] 国庆千岛湖三日两晚游，来晚就赶不上车了！';
				} else {
					desc = '国庆千岛湖三日两晚游，来晚就赶不上车了！';
				}
				return desc;
			},
			getLink: function () {
				// 微信分享的链接
				let sharedLink = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/RouteDetail/index.html';
				return sharedLink;
			},
			getSharedImgUrl: function () {
				// 微信分享的省略图
				let imageUrl = 'http://yougo.xinguang.com/fightgroup-web/public/res/images/Share/WechatIMG13.png'; // 分享图标
				return imageUrl;
			}
		}
	},
	'joinGroup': function () {
		return {
			getTitle: function (remain, price) {
				// 微信分享的标题
				// 二期定制化的旅游路线再取团长开团的标准价
				//let builtTitle =  '[还差'+remain+'人]　￥'+price+'/人　千岛湖3日2晚自驾休闲游拼团';
				let builtTitle =  '旅行竟然可以这么玩？￥998千岛湖三日两晚拼团自驾游';
				return builtTitle;
			},
			getDesc: function (remain) {
				// 微信分享描述信息
				// 二期定制化的旅游路线再取团长开团的标准价
				//let desc = '￥'+price+'/人起，千岛湖3日2晚自驾休闲游定制拼团 10人起享受团队超低价';
				let desc;
				if (remain) {
					desc = '[还差'+remain+'人] 国庆千岛湖三日两晚游，来晚就赶不上车了！';
				} else {
					desc = '国庆千岛湖三日两晚游，来晚就赶不上车了！';
				}
				return desc;
			},
			getLink: function (detailId, sharedGroupId) {
				// 微信分享的链接
				let sharedLink = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/JoinGroup/index.html?detailId=' + detailId + '&groupId=' + sharedGroupId;
				return sharedLink;
			},
			getSharedImgUrl: function () {
				// 微信分享的省略图
				let imageUrl = 'http://yougo.xinguang.com/fightgroup-web/public/res/images/Share/WechatIMG13.png'; // 分享图标
				return imageUrl;
			}
		}
	}	
};


module.exports = shareStrategy;