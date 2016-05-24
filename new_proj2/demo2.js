var constantize = (obj) => {
	Object.freeze(obj);
	Object.keys(obj).forEach((key, index) => {
		console.log(value);
		if (typeof obj[key] === 'object') {
			Object.freeze(obj[key]);
		}
	})
}
var obj = {
	'a' : 'qwe123',
	'b' : {
		'c' : '12313'
	}
};

constantize(obj);
//obj.b.c = 'xxx'
console.log(obj);

