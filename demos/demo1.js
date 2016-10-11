function* gen () {
	let a = 0,
		b = 1;

	while (true) {
		[a, b] = [b, a+b];
		yield a;
	}
}

let c = gen();
let d = 10;
while (d--) {
	console.log('0'+(10-d).toString(), c.next().value);
};