'use strict'

var util = {
	clone(obj){
		// keep the inheritance relationship
		let originPro = Object.getPrototypeOf(obj);
		return Object.assign(Object.create(originPro), obj);
	}
};

function b() {};
b.prototype = {
	constructor : b,
	kk : 12
};

var a = {
	test () {
		console.log('test');
	}
};

a.prototype = new b();

var c = util.clone(a);

console.log(a);
console.log(a.test());
console.log(a.prototype.kk);



var ms = {};

const merge = (target, ...source) => Object.assign(target, ...source)

ms.exports = {merge};

console.log('ms', ms);

var d = merge(a, b , {'c':'c'});
console.log('d', d);


const plus = (a, b) => { return a+b };
console.log(plus(1,2));


console.log(Symbol.iterator);



function log () {
	console.log.apply(this, arguments);
};

function *fib() {
	let [a, b] = [0, 1];
	while (true) {
		[a, b] = [b, a+b];
		yield a;
	}
};

var c = fib();

log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());
log(c.next());


var ccc = {
	'a' : 1,
	'b' : 1,
	'c' : 1,
	'd' : 1
};

log('==================');
for (let [k,v] of Object.entries(ccc)) {
	log(v)
}



var hello = 'Hello World';
log([...hello])



log(Array.from(new Set(Object.keys(ccc))));
