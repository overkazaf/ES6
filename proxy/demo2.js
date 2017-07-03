let Factory = new Proxy({}, {
	get(target, key, receiver) {
		if (key in target) {
			return target[key];
		} else {
			throw new Error(`${key} doesn't exist in this ${target.constructor}`);
		}
	},
	set(target, key, value, receiver) {
		return Reflect.set(target, key, value, receiver);
	},
});

let ApiFactory = Object.create(Factory);

ApiFactory.test = Object.create(null);
let testApi = ApiFactory.test;

console.log(testApi);

