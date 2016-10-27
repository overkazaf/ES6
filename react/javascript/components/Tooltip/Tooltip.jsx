import React, {Component} from 'react';
import './Tooltip.scss';

export default class Tooltip extends Component {
	constructor(props){
		super(props);
		this.state = {
			shown: false,
			tpl:'',
			message: this.props.message || '测试提示信息',
			direction: 'left',
			handleClick: this.props.handleClick || function (){},
			refEl : this.props.refEl
		};
	}

	tooltip (option) {
		let that = this;
		this.setState({
			shown: true,
			tpl: option.tpl || '',
			message: option.message,
			direction: option.direction || this.state.direction,
			handleClick: function () {
				option.callback && option.callback();
				setTimeout(that.hide.bind(that), 500);
			}
		});
	}

	hide () {
		this.setState({
			shown: false
		});
	}

	getElementRangeBox (el) {
		let $el = $(el);
		let width = $el.outerWidth();
		let height = $el.outerHeight();
		let top = $el.offset().top;
		let left = $el.offset().left;

		return {
			left: left,
			top: top,
			right: left + width,
			bottom: top + height
		}
	}

	calcTooltipPosition (dir, box, tooltipRect, offset = 10) {
		let boxWidth = box.right - box.left;
		let boxHeight = box.bottom - box.top;
		let left, top;
		switch (dir) {
			case 'left':
				left = box.left - offset - tooltipRect.width;
				top = 0;
			break;
			case 'top':
				left = box.left + boxWidth/2 - tooltipRect.width/2;
				top = 0 - offset - tooltipRect.height;
			break;
			case 'right':
				left = box.right + offset;
				top = 0;
			break;
			case 'bottom':
				left = box.left + boxWidth/2  - tooltipRect.width/2;
				top = boxHeight + offset;
			break;
			default:
			break;
		}
		return {
			position: 'absolute',
			left: left,
			top: top,
			width: tooltipRect.width,
			height: tooltipRect.height
		}
	} 

	setRefEl (el, callback) {
		this.setState({
			refEl : el
		}, ()=> {
			callback && callback();
		});
	}

	buildTmpTooltipRect (message) {
		let $t = $('<div class="m-tooltip"></div>').html(message).appendTo($(document.body));
		let ret = {
			width: $t.outerWidth(),
			height: $t.outerHeight()
		};
		$t.remove();
		return ret;
	}

	render () {
		let {
			message,
			tpl,
			shown,
			direction,
			refEl,
			handleClick
		} = this.state;

		if (!refEl) return(<div></div>);
		let tooltipClazz = !!shown ? 'm-tooltip' : 'm-tooltip hide';
	 	let box = this.getElementRangeBox(refEl);
	 	let insideMessage = (tpl == '') ? message : tpl;
	 	let tooltipRect = this.buildTmpTooltipRect(insideMessage);
	 	let styleObj = this.calcTooltipPosition(direction, box, tooltipRect);

	 	tooltipClazz = 'tooltip-' + direction + ' ' + tooltipClazz;
		
		if (tpl == '') {
			return (
				<div onClick={handleClick} className={tooltipClazz} style={styleObj}>
					{insideMessage}
				</div>
			)
		} else {
			return (
				<div 
				onClick={handleClick} 
				className={tooltipClazz} 
				style={styleObj}
				dangerouslySetInnerHTML={{__html: insideMessage}}>
				</div>
			)
		}
	}

}