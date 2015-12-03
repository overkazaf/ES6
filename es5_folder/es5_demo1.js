"use strict";

function main() {
	var arr = [1, 2, 3];
	return arr.map(function (x) {
		return x * x - 1;
	});
}

console.log(main());
