function gen () {
	let id = 0;
	return function () {
		return ++id;
	}
};

let gid = gen();

class PluginBase {
	constructor(options) {
		this.options = options;
		this.gid = gid();
		console.log('constructor');
	}

	toString() {
		return '(' + this.gid + ')';
	}
}

let pb = new PluginBase({'name' : 'NewPlugin', 'type' : 'text'});
console.log('pb', pb.toString());



class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

console.log(point.toString()) // (2, 3)

// point.hasOwnProperty('x') // true
// point.hasOwnProperty('y') // true
// point.hasOwnProperty('toString') // false
// point.__proto__.hasOwnProperty('toString') // true