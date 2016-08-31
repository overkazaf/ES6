
let mockUrlPrefix = 'http://localhost:8089/src/mock';

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
}