// Reflect
const SEP_COUNT = 100;
const SEP = '='.repeat(SEP_COUNT);
let log = function () {
	let args = [...arguments];
	console.log.apply(this, args);
};

log(SEP);

log(Reflect.has(Object, 'assign'));
