import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Entry from 'components/Entry/Entry'
import SwipeOut from 'components/Swipeout/swipeout'
import Hammer from 'lib/hammer.min.js'
import 'scss/base.scss'
import 'scss/Entry/index.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			items : ['a', 'b', 'c', 'd']
		};
	}

	onClick () {
		alert('onClick');
	}

	handleItemDelete (idx) {
		let items = this.state.items;
		items.splice(idx, 1);

		this.setState({
			items : items
		});
	}

	handleItemConfirm (idx) {
		alert('handleConfirm');
		let items = this.state.items;
		let newItem = items[idx];
		items.push(newItem);

		this.setState({
			items : items
		});
	}

	render () {
		let _this = this;
		return (
			<ul className="m-container">
				{
					this.state.items.map(function (itemName, index){
						let handleDelete = function () {
							alert('handleDelete inSide');
							_this.handleItemDelete(index);
						}

						let handleConfirm = function () {
							alert('handleConfirm inSide');
							_this.handleItemConfirm(index);
						}
						return (
							<SwipeOut
					            right={[{
					              name: 'confirm',
					              text: '追加',
					              onPress: handleConfirm,
					            },{
					              name: 'delete',
					              text: '删除',
					              onPress: handleDelete,
					            }]}
					            additionalCls='my-swipeout'
					            key={index}
					            autoClose
					          >
					            <li className="list-item">
					              <Item name={itemName} />
					            </li>
					        </SwipeOut>
						)
					}.bind(this))
				}
			</ul>
		)
	}
}

class Item extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				Item {this.props.name} Inside
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);