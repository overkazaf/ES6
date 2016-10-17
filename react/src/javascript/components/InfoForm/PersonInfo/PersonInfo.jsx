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

		this.state = {
			data: this.props.personInfo || {
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
				}
			},
			maxAdultValue: this.props.maxAdultValue || 15
		};
	}

	componentWillReceieveProps (nextProps) {
		if (nextProps.personInfo) {
			this.setState({
				data: {
					adult: nextProps.personInfo.adult,
					kid: nextProps.personInfo.kid
				}
			});
		}

		if (nextProps.maxAdultValue) {		
			this.setState({
				maxAdultValue: nextProps.maxAdultValue
			});
		}
	}


	handleAdultNumChange (n) {
		let currentData = this.state.data;
		let {adult, kid} = currentData;
		let {main, extra, count} = adult;
		let that = this;

		if (n > count) {
			// 成人数增加
			extra.push(PersonFactory.create());
			this.setState({
				data: {
					adult : {
						count: extra.length+1,
						main: main,
						extra: extra
					},
					kid: kid
				}
			}, () => {
				if (that.props.handleMemberAmountChange) {
					that.props.handleMemberAmountChange(that.state.data)
				}
			});
		} else if (n == count - 1) {
			let adult = currentData.adult;

			let confirmBox = this.refs.confirmBox;
			confirmBox.showConfirmBox(
			'提示', 
			'减少数量会删除最后一个联系人信息，确认要继续操作？', 
			function () {
				adult.extra.pop();

				that.setState({
					data: {
						adult: {
							count: adult.count - 1,
							main: adult.main,
							extra: adult.extra
						},
						kid: kid
					}
				}, () => {

					if (that.props.handleMemberAmountChange) {
						that.props.handleMemberAmountChange(that.state.data);
					}
				});
			}, 
			function () {
				that.refs.adultCounter.setCurrentValue(count);
			});
		}
	}

	handleKidNumChange (n) {
		let that = this;
		let currentState = this.state;
		this.setState({
			data: {
				adult: currentState.data.adult,
				kid: {
					count: n
				}
			}
		}, () => {
			if (that.props.handleMemberAmountChange) {
				that.props.handleMemberAmountChange(that.state.data)
			}
		});
	}

	handleAdultDelete (index) {
		let that = this;
		let currentData = this.state.data;
		let {adult, kid} = currentData;
		let count = adult.count;
		let confirmBox = this.refs.confirmBox;
			confirmBox.showConfirmBox(
			'提示', 
			'确认要继续删除联系人信息？', 
			function () {
				adult.extra.splice(index, 1);
				const newExtraCount = adult.extra.length + 1;

				let updatedState = {
					data: {
						adult: {
							count: newExtraCount,
							main: adult.main,
							extra: adult.extra
						},
						kid: kid
					}
				};
				
				that.setState(updatedState, () => {

					if (that.props.handleMemberAmountChange) {
						that.props.handleMemberAmountChange(that.state.data);
						//通知子组件更新自己的状态
						that.refs.adultCounter.setCurrentValue(newExtraCount);
					}
				});
			}, function () {
				that.refs.adultCounter.setCurrentValue(count);
			});
	}


	updateMainInfoValue () {
		let currentState = this.state;
		let currentData = currentState.data;
		let {adult, kid} = currentData;
		let mainName = this.refs.mainName;
		let mainID = this.refs.mainID;
		let mainPhone = this.refs.mainPhone;
		let phoneNumberLength = 11;

		if (mainPhone.value.length > phoneNumberLength) {
			mainPhone.value = mainPhone.value.substring(0, phoneNumberLength);
			return;
		}

		this.setState({
			data: {
				adult: {
					count: adult.count,
					main:{
						name: mainName.value,
						id: mainID.value,
						phone: mainPhone.value
					},
					extra: adult.extra
				},
				kid: kid
			}
		}, () => {
			this.props.handleMainInfoChange(this.state.data);
		});
	}


	updatePersonInfo (index, name, id) {
		let currentData = this.state.data;
		let adult = currentData.adult;
		let extra = adult.extra;

		if (index < extra.length) {
			extra[index] = {
				name : name,
				id: id
			};

			this.setState({
				data: {
					adult : {
						count: adult.count,
						main: adult.main,
						extra: extra
					},
					kid: currentData.kid
				}
			}, () => {
				if (this.props.handleMainInfoChange) {
					this.props.handleMainInfoChange(this.state.data);
				}
			});
		}
	}

	render () {
		let that = this;
		let maxAdultValue = this.state.maxAdultValue,
			maxKidValue = 10,
			maxNameLength = 4,
			maxPhoneLength = 11,
			maxIDLength = 18,
			currentData = this.state.data,
			{adult, kid} = currentData,
			mainPhone = adult.main.phone,
			mainId = adult.main.id,
			mainName = adult.main.name,
			curAdultCount = adult.count,
			curKidCount = kid.count || 0;

		let appendedList = adult.extra.map(function (item, index) {
			//　tips：这里如果没有为每个li加上key值，在更新的时候，React就会忽略掉这个组件
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

		let handleAdultNumChange = function () {
			that.handleAdultNumChange.apply(that, [...arguments]);
		};

		let handleKidNumChange = function () {
			that.handleKidNumChange.apply(that, [...arguments]);
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
									<Counter 
										minVal={0} 
										numChange={handleKidNumChange} 
										maxVal={maxKidValue} 
										curVal={curKidCount}/>
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
