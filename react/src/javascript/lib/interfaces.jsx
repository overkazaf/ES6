let port = 8088;
let protocal = 'http';
let domainName = 'localhost';
let domainPrefix = protocal + '://' + domainName;
let urlPrefix = domainPrefix + ':' + port + '/';

export default class BackendInterface {
	static all () {
		return BackendInterface.paddingPrefix({
			'pay' : 'pay/action/version'
		})
	}

	/**
	 * [paddingPrefix 为接口填充url前缀]
	 * @Author   JohnNong
	 * @Email    overkazaf@gmail.com
	 * @Github   https://github.com/overkazaf
	 * @DateTime 2016-09-12T10:44:23+0800
	 * @param    {[type]}                     obj [description]
	 * @return   {[type]}                         [description]
	 */
	static paddingPrefix (obj) {
		let newObj = {};
		for (let attr in obj) {
			newObj[attr] = urlPrefix + obj[attr];
		}
		return newObj;
	}
}
