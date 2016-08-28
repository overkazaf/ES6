import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Entry from 'components/Entry/Entry'
import Hammer from 'lib/hammer.min.js'
import 'scss/base.scss'
import 'scss/Entry/index.scss'



class MyComponent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			items : [1, 2, 3, 4]
		};
	}

	onClick () {
		console.log('onClick');
	}

	render () {
		return (
			<div className="m-container">
				{
					this.state.items.map(function (item, index){
						let itemName = 'entryEl'+index;
						return (
							<Entry handleClick={this.onClick} key={index} name={itemName}/>
						)
					}.bind(this))
				}
			</div>
		)
	}
}

class Item extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name : 'constructor'
		};
	}
	
	render() {
		let name = this.state.name || 'init';
		return (
			<a onClick={this.props.handleClick}>
				{name}
			</a>
		)
	}
}


function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 1000);