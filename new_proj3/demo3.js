const SEPERATOR = '================================';
const FAC_N = 120;

let tco = (n, val = 1) => {
	if (n === 1) return val;
	else return tco(n-1, n*val); 
}

function Timer() {	
	this.timers = {};
};

Timer.prototype.start = function (key) {
	return (this.timers[key] = +new Date());
}


Timer.prototype.now = function () {
	return +new Date();
} 


Timer.prototype.ellapse = function (key) {
	return (+new Date()) - this.timers[key];
} 

var t = new Timer();

console.log('start', t.start('tco'));

console.log(tco(FAC_N));

console.log('now', t.now());
console.log('ellapse', t.ellapse('tco'));


console.log(SEPERATOR);

let fac = (n) => {
	return n === 1 ? n : n*fac(n-1);
}


console.log('start', t.start('fac'));

console.log(fac(FAC_N-10));

console.log('now', t.now());
console.log('ellapse', t.ellapse('fac'));


console.log('\u01D1'.normalize())


let a = 12;
let b = 14;

const tpl = `Hello, ${a * b}`;
console.log('tpl', tpl);


let tplCompiler = (tpl , dataModel) => {
	return undefined
}




