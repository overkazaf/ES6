function f () {
	console.log('aaaa');
}

// 不会走f()，因为这是惰性求值
var [a = f()] = [1];

console.log(a);

let {foo, bar} = {bar:'hello', foo:'world'};
console.log('foo', foo);
console.log('bar', bar);


let {f:yy, b:xx} = {xx:'bbb', yy:'ccc'};
console.log(f);
