import React, {Component} from 'react';
import Counter from 'components/Counter/Counter';
import SwipeOut from 'components/SwipeOut/SwipeOut';
import './PersonInfo.scss'


export default class PersonInfo extends Component {

	constructor (props) {
		super(props);

		this.state = {
			adult : {
				count: 1,
				main: {
					name: '',
					id: '',
					phone: ''
				},
				extra: []
			},
			kid: {
				count: 1
			}
		};
	}

	componentWillReceieveProps (nextProps) {
		/**
		 *
		 *
		 *
		personInfo: {
			adult : {
				count: 1,
				main: {
					name: '',
					id: '',
					phone: ''
				},
				extra: []
			},
			kid: {
				count: 1
			}
		}
		*/
		if (nextProps.personInfo) {
			this.setState(nextProps.personInfo);
		}
	}

	handleAdultNumChange (n) {
		let main = this.state.adult.main;
		let extra = this.state.adult.extra;
		let count = this.state.adult.count;

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
			});
		} else if (n == count - 1) {
			if (confirm('减少数量会删除最后一个联系人信息，确认要继续操作？')) {
				let adult = this.state.adult;
				
				adult.extra.pop();

				this.setState({
					adult: {
						count: adult.count - 1,
						main: adult.main,
						extra: adult.extra
					}
				}, () => {
					if (this.props.handleMemberAmountChange) {
						this.props.handleMemberAmountChange(this.state);
					}
				});
			}
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
		});

		
	}

	handleAdultDelete (index) {
		alert('index::' + index);
		if (confirm('确认要继续删除该联系人信息？')) {
			let adult = this.state.adult;

			adult.extra.splice(index, 1);

			const newCount = adult.extra.length + 1;
			this.setState({
				adult: {
					count: newCount,
					main: adult.main,
					extra: adult.extra
				},
				kid: this.state.kid
			}, () => {
				if (this.props.handleMemberAmountChange) {
					this.props.handleMemberAmountChange(this.state);

					// 先这样处理，这样才能通知子组件更新自己的状态
					this.refs.adultCounter.props.curValue = newCount;
					this.refs.adultCounter.state.num = newCount;
				}
			});

		}
	}

	updatePersonInfo (index, name, id) {
		console.log('update PersonInfo', arguments);
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
		let personInfo = this.state;
		const maxCounterValue = 15,
			  curAdultCount = personInfo.adult.count,
			  curKidCount = personInfo.kid.count || 0;

		let appendedList = personInfo.adult.extra ? personInfo.adult.extra.map(function (item, index) {
			return (
				<li key={index} className="appended-person-list-item">
					<AppendedPerson
					index={index}
					name={item.name}
					id={item.id}
					onUpdate={that.updatePersonInfo}
					onDeleteClick={that.handleAdultDelete.bind(that, index)}/>
				</li>
			)
		}) : null;


		let handleAdultNumChange = function () {
			that.handleAdultNumChange.apply(that, arguments);
		};

		let handleKidNumChange = function () {
			that.handleKidNumChange.apply(that, arguments);
		};

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
									<Counter ref="adultCounter" numChange={handleAdultNumChange} maxValue={maxCounterValue} curValue={curAdultCount}/>
								</li>
								<li className="amount-ctrl-list-item child">
									<span>儿童</span>
								</li>
								<li className="amount-ctrl-list-item">
									<Counter numChange={handleKidNumChange} maxValue={maxCounterValue} curValue={curKidCount}/>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="line main-person-name">
						<div className="u-info-item">
							<input type="text" className="info-label person-name" placeholder="填写姓名"></input>
							<input type="text" className="info-value person-id" placeholder="请填写身份证号码"></input>
						</div>
					</div>
					<ul className="appended-person-list">
						{appendedList}
					</ul>

					<div className="main-person-phone">
						<div className="u-info-item">
							<span className="info-label">联系电话</span>
							<input type="text" className="info-value" placeholder="请输入您的联系方式"></input>
						</div>
					</div>
				</div>
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

    console.log('constructor in AppendedPerson', props);

    this.state = {
    	index: this.props.index,
    	name: this.props.name || '',
    	id: this.props.id || ''
    }
  }

  handleDelete(index) {
    this.props.onDeleteClick(index);
  }

  handleKeyup () {
  	console.log('arguments in handleKeyup', this.state.index + ':' + this.state.name + ':' + this.state.id);
  	if (this.props.onUpdate) {
  		this.props.onUpdate(this.state.index, this.state.name, this.state.id);
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
        	updateValue={that.handleKeyup.bind(that)}/>
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

		console.log('constructor in InfoItem', props);
		this.state = {
			index: this.props.index,
			name: this.props.name,
			id: this.props.id
		};
	}

	updateValue () {
		let name = this.refs.inpName;
		let id = this.refs.inpID;

		if (this.props.updateValue) {
			this.props.updateValue(this.state.index, name.value, id.value);
		}
	}

	render () {
		const defaultPersonName = '填写姓名',
			  defaultPersonID = '请填写身份证号码',
			  nameVal = this.state.name,
			  idVal = this.state.id;

		return (
			<div className="u-info-item">
				<input type="text" onKeyUp={this.updateValue.bind(this)} ref="inpName" className="info-label person-name" placeholder={defaultPersonName} value={nameVal}></input>
				<input type="text" onKeyUp={this.updateValue.bind(this)} ref="inpID" className="info-value person-id" placeholder={defaultPersonID} value={idVal}></input>
			</div>
		)
	}
}
