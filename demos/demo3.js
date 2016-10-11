let fetch = require('node-fetch');

function* gen () {
	const url = 'https://api.github.com/users/github';
	let result = yield fetch(url);
	console.log(result);
}

var g = gen();
var result = g.next();

result.value.then(function (data){
	return data.json();
}).then(function (data){
	g.next(data);
});
