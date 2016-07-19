let {sin, cos, log} = Math;

function fetch (url, {method = 'GET', data = {}, timeout = 5000, headers = {}, success = function () {}, error = function () {}} = {}) {
	console.log(url);
	console.log(arguments);
}

fetch('http://www.baidu.com');
fetch('http://www.baidu.com', {
	data : {
		key1 : 'key1'
	}
});

let arr = [1,2,3,45,6];

console.log(...arr)


let arr2 = [3,4,5,5,5,5];
arr2.push(...arr)
console.log(arr2);


console.log(fetch.name);

console.log(Object.is(NaN, NaN));


let s = Symbol();

console.log(typeof s);


