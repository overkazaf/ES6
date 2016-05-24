for (let codePoint of 'abc') {
	console.log(codePoint);
}

let fn = function(){
	return 'Hello Kitty';
};

let t = `foo ${fn()} bar`
console.log(t);