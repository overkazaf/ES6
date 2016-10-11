let a = '111111';
console.log(`Hello ${a} world!`);

let fs = require('fs');
fs.readFile('/etc/passwd', function (err, data) {
	if (err) throw err;
	console.log(data.toString());
})