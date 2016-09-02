
let mockUrlPrefix = 'http://localhost:8088/src/mock';

export default class Util {

	static fetchData (param) {
		let {url, data, method, successFn, errorFn} = param;
		$.ajax({
	        url: mockUrlPrefix + url,
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        },
	        type: method || 'GET',
	        dataType: 'json',
	        data: JSON.stringify(data) || {},
	        traditional: true,
	        xhrFields: {
	          withCredentials: true
	        },
	        crossDomain: true,
	        success: function(data) {
	          successFn(data);
	        },
	        error: function(data) {
	          errorFn(data);
	        }
	    });
	}

	static parseQueryString (url) {
	    let reg_url =/^[^\?]+\?([\w\W]+)$/,
	        reg_para=/([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
	        arr_url = reg_url.exec( url ),
			ret = {};
	    if( arr_url && arr_url[1] ){
	        let str_para = arr_url[1],result;
	        while((result = reg_para.exec(str_para)) != null){
	            ret[result[1]] = result[2];
	        }
	    }
	    return ret;
	};

	/**
	 * [isGroup 从页面跳转过来的url判断是否为拼团页面]
	 * @Author   JohnNong
	 * @Email    overkazaf@gmail.com
	 * @Github   https://github.com/overkazaf
	 * @DateTime 2016-09-02T16:21:48+0800
	 * @return   {Boolean}                    [description]
	 */
	static isGroup () {
		let paramObj = Util.parseQueryString(location.href);
		if (!!paramObj) {
			return (paramObj['isGroup'] && paramObj['isGroup'] == 'true');
		} else {
			return false;
		}
	}
}