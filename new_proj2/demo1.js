const PI = 3.1415926;
let f;
{
	let a = '123';
	f = function (){
		console.log(a);
		console.log('PI', PI);
	};
}

f();

