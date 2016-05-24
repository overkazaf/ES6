let [a, [b], {c,d}] = [1, [2], {'c':323, 'd':222}]
console.log(a);
console.log(b);
console.log(c);
console.log(d);



let [e,f,g] = new Set(['e', 'f', 'g']);
console.log(e);
console.log(f);
console.log(g);



function* fibs () {
	var a = 0,
		b = 1;

	while (true) {
		yield a;
		[a, b] = [b, a+b];
	}
};


let [first, second, third, forth, fifth, sixth, seventh] = fibs();

console.log(seventh);