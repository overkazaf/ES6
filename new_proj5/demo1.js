class BasePlugin {
	constructor () {
		console.log('I am base');
	}

	toString () {
		console.log('toString method has been called at BasePlugin');
	}
}



class Accordion extends BasePlugin {

	constructor (props) {
		super(props);

		console.log('im accordion');
	}

	toString () {
		console.log('toString method has been called at Accordion');
	}


	static collapse () {
		console.log('static method called ... collapse');
	}
}


let acc = new Accordion();

acc.toString();

Accordion.collapse();