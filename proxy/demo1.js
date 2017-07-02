
let obj = new Proxy({}, {
	get(target, key, receiver) {
		console.log(`getting key ${key}`);
		return Reflect.get(target, key, receiver);
	},
	set(target, key, value, receiver) {
		console.log(`setting key ${key} values ${value}`);
		return Reflect.set(target, key, value, receiver);
	},
});


obj.name = 'John Mitnick';

console.log(obj.name);