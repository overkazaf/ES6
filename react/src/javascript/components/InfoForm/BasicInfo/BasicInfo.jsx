import React, {Component} from 'react';
import Util from 'extend/util';
import './BasicInfo.scss'


export default class BasicInfo extends Component {

	constructor (props) {
		super(props);
		this.state = this.props.info;

	}

	componentWillReceiveProps(nextProps) {
	    if (nextProps.form) {
	      	this.setState({
	      		form: nextProps.form
	      	});
      	}

      	if (typeof nextProps.canSelect != 'undefined') {
      		this.setState({
      			canSelect : nextProps.canSelect
      		});
      	} 
	}


	/**
	 * [fixedConditionsByParam 修正当前表单选中值的策略函数]
	 * @param  {[type]} conditions [description]
	 * @param  {[type]} type       [description]
	 * @param  {[type]} option     [description]
	 * @return {[type]}            [description]
	 */
	fixedConditionsByParam(conditions, type, option) {
		let retArray = Util.deepClone(conditions);

		retArray.map(function (item, index){
			if (item.name == type) {
				item.currentValue = option.value;
			}
			return item;
		});
		return retArray;
	}

	selectHandler (handleType, label, value, sortIndex) {
		let that = this;
		let oldForm = this.state.form;
		let fixedConditions = this.fixedConditionsByParam(oldForm, handleType,  {
			label:label, 
			value:value, 
			index: sortIndex
		});
		this.setState({
			form: fixedConditions
		}, ()=>{
			if (that.props.handleBasicInfoStateChange) {
				that.props.handleBasicInfoStateChange(that.state);
			}
		});
		
	}

	render () {
		let that = this;
		let formData = this.state.form;
		let formContent = !!formData?formData.map(function (item, itemIndex){
			let {
				defaultValue,
				currentValue,
				id,
				name,
				notNull,
				paramList,
				ref,
				title,
				type,
				display
			} = item;
			let listContent = paramList.map(function (listItem, listItemIndex){
				let {
					label, value, index
				} = listItem;
				const clazzName = (value == currentValue) ? "opt-list-item active" : "opt-list-item";
				const itemKey = `${listItemIndex}-${that.state.canSelect}`;

				// 下面是根据不同的组件结构执行不同的渲染策略
				switch (type) {
					case 'select':
						if (that.state.canSelect) {
							// 在可选中的情况下才给定选中的handler
							return (
								<li 
									key={itemKey} 
									className={clazzName} 
									onClick={that.selectHandler.bind(that, name, label, value, index)}
								>{label}</li>
							)
						} else {
							return (
								<li 
									key={listItemIndex} 
									className={clazzName}
								>{label}</li>
							)
						}
						break;
					default:
						console.error('implement the new ' + type + ' component handler first');
				}
			});

			if (display) {
				return (
					<div className="row">
						<div className="opt-header">
							<b className="title">{title}</b>
						</div>
						<ul className="opt-list">
							{listContent}
						</ul>
					</div>
				);
			} else {
				return (
					<div></div>
				);
			}
		}):null;

		return (
			<div className="m-group-info">
				{formContent}
				<div className="row">
					<div className="opt-header">
						<b className="title">出行天数</b>
					</div>
					<div className="desc-text">3天</div>
				</div>
			</div>
		);
	}
}