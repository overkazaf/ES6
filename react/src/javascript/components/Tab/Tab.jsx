import React, {Component} from 'react'
import './Tab.scss'

export default 
class Tab extends Component {
	constructor (props) {
		super(props);
		this.state = {
			activeIndex: this.props.activeIndex
		};
	}

	componentDidMount() {
	    this.transformBar(this.props.activeIndex);  
	}

	handleItemClick (item, index) {
		this.transformBar(index);
		if (this.props.handleItemClick) {
			this.props.handleItemClick(item, index);
		}
	}

	transformBar (index) {
		let bar = this.refs['bar'];
		let tab = this.refs['tab'];
		let itemWidth = Math.ceil($(tab).outerWidth() / this.props.tabs.length);
		let barStyle = {
			position: 'absolute',
			width: itemWidth + 'px',
			left: index * itemWidth + 'px'
		};
		$(bar).animate(barStyle);

		this.setState({
			activeIndex: index
		});
	}

	init (index) {
		setTimeout(function (){
			this.transformBar(index);
		}.bind(this), 0);
	}

	render () {
		let _this = this;
		let activeIndex = this.state.activeIndex;
		let tabs = this.props.tabs.map(function (item, index) {
			let clazz = (index !== activeIndex) ? 'tab-item' : 'active tab-item';

			return (
				<li onClick={() => {
					_this.handleItemClick(item, index);
				}} className={clazz} key={index}>
					{item}
				</li>
			)
		});
		let tabClazz = this.props.isTopTab ? 'm-tab top' : 'm-tab';
		return (
			<ul ref="tab" className={tabClazz}>
				{tabs}
				<div ref="bar" className="h-bar"></div>
			</ul>
		)
	}
}

