import React, {Component} from 'react';
import Counter from 'components/Counter/Counter';
import SwipeOut from 'components/SwipeOut/SwipeOut';
import Confirm from 'components/Confirm/Confirm';
import './PersonInfo.scss'


export default class PersonInfo extends Component {

	constructor (props) {
		super(props);

		let adultCount = this.props.defaultAdultValue;
		let adultExtra = adultCount == 1 ? [] : [{name:'', id:''}];

		this.state = this.props.personInfo || {
			adult : {
				count: adultCount,
				main: {
					name: '',
					id: '',
					phone: ''
				},
				extra: adultExtra
			},
			kid: {
				count: 0
			},
			maxAdultValue: this.props.maxAdultValue
		};
	}

	componentWillReceieveProps (nextProps) {
		if (nextProps.personInfo) {
			this.setState({
				adult: nextProps.personInfo.adult,
				kid: nextProps.personInfo.kid
			});
		}

		if (nextProps.maxAdultValue) {
			
			this.setState({
				maxAdultValue: nextProps.maxAdultValue
			});
		}
	}


	handleAdultNumChange (n) {
		let main = this.state.adult.main;
		let extra = this.state.adult.extra;
		let count = this.state.adult.count;
		let that = this;
		if (n > count) {
			extra.push(PersonFactory.create());
			this.setState({
				adult : {
					count: extra.length+1,
					main: main,
					extra: extra
				}
			}, () => {
				if (this.props.handleMemberAmountChange) {
					this.props.handleMemberAmountChange(this.state)
				}
				return true;
			});
		} else if (n == count - 1) {
			let adult = this.state.adult;

			let confirmBox = this.refs.confirmBox;
			confirmBox.showConfirmBox(
			'提示', 
			'减少数量会删除最后一个联系人信息，确认要继续操作？', 
			function () {
				adult.extra.pop();

				that.setState({
					adult: {
						count: adult.count - 1,
						main: adult.main,
						extra: adult.extra
					}
				}, () => {
					
					that.updateExtraList(adult.extra);

					if (that.props.handleMemberAmountChange) {
						that.props.handleMemberAmountChange(that.state);
					}
				});
			}, 
			function () {
				that.refs.adultCounter.setCurrentValue(count);
			});
		}
	}

	handleKidNumChange (n) {
		this.setState({
			kid: {
				count: n
			}
		}, () => {
			if (this.props.handleMemberAmountChange) {
				this.props.handleMemberAmountChange(this.state)
			}
			return true;
		});
	}

	handleAdultDelete (index) {
		let that = this;
		let adult = this.state.adult;
		let count = adult.count;
		let confirmBox = this.refs.confirmBox;
			confirmBox.showConfirmBox(
			'提示', 
			'确认要继续删除联系人信息？', 
			function () {
				adult.extra.splice(index, 1);

				const newExtraCount = adult.extra.length + 1;
				let updatedState = {
					adult: {
						count: newExtraCount,
						main: adult.main,
						extra: adult.extra
					},
					kid: that.state.kid
				};
				
				that.setState(updatedState, () => {
					
					that.updateExtraList(adult.extra);

					if (that.props.handleMemberAmountChange) {
						that.props.handleMemberAmountChange(that.state);
						// 先这样处理，这样才能通知子组件更新自己的状态
						that.refs.adultCounter.setCurrentValue(newExtraCount);
					}
				});
			}, function () {
				that.refs.adultCounter.setCurrentValue(count);
			});
	}



	/**
	 * [updateExtraList ]
	 * @return {[type]} [description]
	 */
	updateExtraList () {
		// let refUl = this.refs['appendedList'];
		
		// let $names = $(refUl).find('input.person-name');
		// let $ids = $(refUl).find('input.person-id');
		// let that = this;
		// let extra = this.state.adult.extra;
		
		//this is a piece of hacking code, should change it!
		// setTimeout(function (){
		// 	$names.each(function (index, item){
		// 		$(item).val(extra[index].name)
		// 	});

		// 	$ids.each(function (index, item){
		// 		$(item).val(extra[index].id)
		// 	});

		// 	// 通知父级要更新列表
		// 	that.props.noticeExtraListUpdated && that.props.noticeExtraListUpdated(extra);
		// 	console.log('that.state', that.state);
		// }, 500);	
	}

	updateMainInfoValue () {
		let adult = this.state.adult;
		let mainName = this.refs.mainName;
		let mainID = this.refs.mainID;
		let mainPhone = this.refs.mainPhone;
		let phoneNumberLength = 11;

		if (mainPhone.value.length > phoneNumberLength) {
			mainPhone.value = mainPhone.value.substring(0, phoneNumberLength);
			return;
		}

		this.setState({
			adult: {
				count: adult.count,
				main:{
					name: mainName.value,
					id: mainID.value,
					phone: mainPhone.value
				},
				extra: adult.extra
			}
		}, () => {
			this.props.handleMainInfoChange(this.state);
		});
	}


	updatePersonInfo (index, name, id) {
		let adult = this.state.adult;
		let extra = adult.extra;

		if (index < extra.length) {
			extra[index] = {
				name : name,
				id: id
			};

			this.setState({
				adult : {
					count: adult.count,
					main: adult.main,
					extra: extra
				}
			})
		}
	}

	render () {
		let that = this;
		let maxAdultValue = this.state.maxAdultValue,
			  maxKidValue = 10,
			  maxNameLength = 4,
			  maxPhoneLength = 11,
			  maxIDLength = 18,
			  adult = this.state.adult,
			  mainPhone = adult.main.phone,
			  mainId = adult.main.id,
			  mainName = adult.main.name,
			  curAdultCount = this.state.adult.count,
			  curKidCount = this.state.kid.count || 0,
			  keyPrefix = '' + (new Date().getTime());
		console.log(this.state);

		let appendedList = adult.extra.map(function (item, index) {
			let liKey = adult.extra.length + '-li-' + index;
			let appendedPersonKey = adult.extra.length + '-ap-' + index;
			return (
				<li key={liKey} className="appended-person-list-item">
					<AppendedPerson
					key={appendedPersonKey}
					index={index}
					name={item.name}
					id={item.id}
					handleChange={that.updatePersonInfo.bind(that)}
					onDeleteClick={that.handleAdultDelete.bind(that, index)}/>
				</li>
			)
		});

		console.log('appendedList', appendedList);

		let handleAdultNumChange = function () {
			that.handleAdultNumChange.apply(that, Array.prototype.slice.call(arguments));
		};

		let handleKidNumChange = function () {
			that.handleKidNumChange.apply(that, Array.prototype.slice.call(arguments));
		};
        
        let personCounterContainerClazz = this.props.isGroup ? 'row' : 'row hide';

		return (
			<div className="m-group-info">
				<div className="row">
					<div className="opt-header">
						<b className="title">出行人</b>
						<div className="amount-group">
							<ul className="amount-ctrl-list">
								<li className="amount-ctrl-list-item adult">
									<span>成人</span>
								</li>
								<li className="amount-ctrl-list-item">
									<Counter 
										minVal={1} 
										ref="adultCounter" 
										numChange={handleAdultNumChange} 
										maxVal={maxAdultValue} 
										curVal={curAdultCount}/>
								</li>
								<li className="amount-ctrl-list-item child">
									<span>儿童</span>
								</li>
								<li className="amount-ctrl-list-item">
									<Counter minVal={0} numChange={handleKidNumChange} maxVal={maxKidValue} curVal={curKidCount}/>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="line main-person-name">
						<div className="u-info-item">
							<input value={mainName} type="text" ref="mainName" onChange={that.updateMainInfoValue.bind(that)} maxLength={maxNameLength} className="info-label person-name" placeholder="填写姓名"></input>
							<input value={mainId} type="text" ref="mainID" onChange={that.updateMainInfoValue.bind(that)} maxLength={maxIDLength} className="info-value person-id" placeholder="请填写身份证号码"></input>
						</div>
					</div>
					<ul ref="appendedList" className="appended-person-list">
						{appendedList}
					</ul>

					<div className="main-person-phone">
						<div className="u-info-item">
							<input className="info-label" value="联系电话" readOnly="readonly" />
							<input value={mainPhone} type="text" ref="mainPhone" onChange={that.updateMainInfoValue.bind(that)} maxLength="11" className="info-value" placeholder="请输入您的联系方式"></input>
						</div>
					</div>
				</div>

				<Confirm ref="confirmBox" />
			</div>
		)
	}
}

/**
 * 新增加的人员信息
 */
class AppendedPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	index: this.props.index,
    	name: this.props.name || '',
    	id: this.props.id || ''
    }
  }

  handleDelete(index) {
    this.props.onDeleteClick(index);
  }

  handleChange (state) {
  	if (this.props.handleChange) {
  		let {index, name, id} = state;
  		this.props.handleChange(index, name, id);
  	}
  }

  shouldComponentUpdate(nextProps, nextState) {
   	return true;     
  }

  render() {
    let that = this;
    let recoverStyle = {
      swipeStyle: {left: 0},
      btnStyle: {width: 0}
    };
    return (
      <SwipeOut
        right={[{
          name:'delete',
			text:'删除',
			onPress:this.handleDelete.bind(this, this.props.index)
		}]}
        additionalCls='my-swipeout'
        hasBtnBackground={true}
        autoClose
        edit={true}
        disabled={this.props.edit?true:false}
        contentStyle={!this.props.toClose || this.props.edit ?recoverStyle.swipeStyle:null}
        btnStyle={!this.props.toClose || this.props.edit ?recoverStyle.btnStyle:null}
      >
        <InfoItem 
        	index={this.state.index} 
        	name={this.state.name} 
        	id={this.state.id} 
        	updateValue={that.handleChange.bind(that)}/>
      </SwipeOut>
    )
  }
}

/**
 * 人员信息工厂
 */
class PersonFactory {

	static create () {
		return {
			name: '',
			id:''
		};
	}
}

class InfoItem extends Component {
	constructor (props) {
		super(props);

		this.state = {
			index: this.props.index,
			name: this.props.name,
			id: this.props.id
		};
	}

	updateNameValue (ev) {
		this.setState({
			name : ev.target.value
		}, () => {
			if (this.props.updateValue) {
				this.props.updateValue(this.state)
			}
		});
	}

	updateIDValue (ev) {
		this.setState({
			id : ev.target.value
		}, () => {
			if (this.props.updateValue) {
				this.props.updateValue(this.state)
			}
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
	 	return true;     
	}

	render () {
		const defaultPersonName = '填写姓名',
			  defaultPersonID = '请填写身份证号码',
			  nameVal = this.state.name,
			  idVal = this.state.id,
			  that = this;
		return (
			<div className="u-info-item">
				<input type="text" onChange={that.updateNameValue.bind(that)} className="info-label person-name" placeholder={defaultPersonName} maxLength="4" value={nameVal}></input>
				<input type="text" onChange={that.updateIDValue.bind(that)} className="info-value person-id" placeholder={defaultPersonID} maxLength="18" value={idVal}></input>
			</div>
		)
	}
}
