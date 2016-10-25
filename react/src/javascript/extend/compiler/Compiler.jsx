export default class Compiler {
	
	tokenize (str) {
		let openTag = '{{';
		let closeTag = '}}';
		let ret = [];

		do {
			let index = str.indexOf(openTag);
			index = index === -1 ? str.length:index;
			let value = str.slice(0, index);

			//  抽取静态内容
			ret.push({
				expr: value,
				type: 'text'
			});

			str = str.slice(index+openTag.length);

			if (str) {
				index = str.indexOf(closeTag);
				let value = str.slice(0, index);

				ret.push({
					expr: value.trim(),
					type: 'js'
				});

				str = str.slice(index + closeTag.length);
			} 
		} while(str.length);

		return ret;
	}

	render (str) {
		let tokens = tokenize(str);
		let ret = [];

		for (let i = 0, token; token = token[i++];) {
			if (token.type === 'text') {
				ret.push('"' + token.expr + '"');
			} else {
				ret.push(token.expr);
			}
		}
	}

	test () {
		console.log(tokenize(tpl));
	}
}