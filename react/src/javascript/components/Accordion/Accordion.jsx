import React, {Component} from 'react';
import './Accordion.scss';

export default class Accordion extends Component {
	constructor (props) {
		super(props);

		this.state = Object.assign({
			collapsed: false
		}, this.props.info);
	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps.info) {
	 		this.setState({
	 			info: nextProps.info
	 		});
	 	}     
	}

	handleCollapse () {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	transformData (item, type) {
		let ret = {};
		switch (type) {
			case 'hotel':
				ret['城市'] = item.city;
				ret['入住'] = item.stayDate;
				ret['离店'] = item.leaveDate;
				ret['名称'] = item.name;
				ret['房型'] = item.houseType;
				ret['房数'] = item.num;
				break;
			case 'user':
				ret['姓名'] = item.name;
				ret['性别'] = item.sex;
				ret['证件类型'] = '身份证';
				ret['证件号码'] = item.cardNo;
				ret['出生日期'] = item.brith;
				break;
			case 'traffic':
				ret['自驾前往']　= '';
				break;
		}

		return ret;
	}

	buildInfoLine (item) {
		return (
			<div >
				{Object.keys(item).map(function (key, index){
					let keyValue = `key-${index}`
					let quote = item[key] == '' ? ':' : '';
					return (
						<div className="row" key={keyValue}>
							<span className="row-key">
								{key}
							</span>
							<span className="row-value">
								 {item[key]}
							</span>
						</div>
					)
				})}
			</div>
		);
	}

	buildInfoContent (list, name, type) {
		let that = this;
		let rawContent = list.map(function (item, index) {
			let itemContent = that.buildInfoLine(that.transformData(item, type));
			return (
				<div className="item-body">
					{itemContent}
				</div>
			)
		});

		let targetContent = (function (){
			return (
				<div className="u-accordion-item">
					<h2 className="item-title">{name}:</h2>
					{rawContent}
				</div>
			);
		})();

		return targetContent;
	}

	getAccordionContent (info) {
		let that = this;
		let hotelContent = info && info.hotel ? that.buildInfoContent(info.hotel,'酒店名称', 'hotel') : null;
		let userContent = info && info.user ? that.buildInfoContent(info.user,'出行人信息', 'user') : null;
		let trafficContent = that.buildInfoContent([{}], '交通信息', 'traffic');

		return (
			<div>
				{hotelContent}
				{trafficContent}
				{userContent}
			</div>
		);
	}

	render () {
		let info = this.state.info;
		let accordionList = this.getAccordionContent(info);
		let that = this;
		let handleCollapse = function () { that.handleCollapse.call(that);};
		let titleText = this.state.collapsed ? '收起详情页' : '展开详情页';
		let arrowClazz = this.state.collapsed ? 'arrow-up' : 'arrow-down';
		let titleTextClazz = this.state.collapsed ? 'title-text' : 'title-text toggle';
		let bodyClazz = this.state.collapsed ? 'm-accordion-body' : 'm-accordion-body ht0';
		return (
			<div className="m-accordion">
				<div className="m-accordion-header" onClick={handleCollapse}>
					<div className="title">
						<span className={arrowClazz}></span>
						<b className={titleTextClazz}>{titleText}</b>
					</div>
				</div>
				<div className={bodyClazz}>
					{accordionList}
				</div>
			</div>
		)
	}
}