function* fibs () {
	let a = 0;
	let b = 1;
	while (true) {
		yield a;
		[a,b] = [b, a+b];
	}
}

var [a,b,c,d,e,f,g] = fibs();
console.log([a,b,c,d,e,f,g]);
