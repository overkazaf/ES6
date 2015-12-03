var map = new Map();

map.set('first', 1);
map.set('last', 12);

for (let [key, val] of map) {
	console.log(key + ':' + val);
}
