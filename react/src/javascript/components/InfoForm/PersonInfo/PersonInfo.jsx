import React, {Component} from 'react';
import Counter from 'components/Counter/Counter';
import SwipeOut from 'components/SwipeOut/SwipeOut';
import './PersonInfo.scss'


export default class PersonInfo extends Component {

	constructor (props) {
		super(props);


		this.state = {
			counts : {
				adult: 1,
				child: 0
			},
			person : {
				name: '',
				id: '',
				phone: ''
			},
			appendedList : [
				this.newEmptyPerson()
			]
		};
	}

	newEmptyPerson () {
		return {
			name: '',
			id:''
		};
	}

	handleAdultNumChange (n) {
		let list = this.state.appendedList;
		alert(n+":::"+list.length);

		if (n > list.length) {
			list = list.push(this.newEmptyPerson());
			this.setState({
				count: {
					adult: n
				},
				appendedList: list
			});
		}
	}


	handleChildNumChange (n) {
		alert('childNum:'+n);
		this.setState({
			count: {
				child: n
			}
		});
	}

	handleDelete (index) {
		alert('delete:::' + index);
		if (index < this.state.appendedList.length) {
			this.state.appendedList.splice(index, 1);

			this.setState({
				appendedList : this.state.appendedList
			})
		}
	}

	render () {
		let that = this;
		const maxCounterValue = 99,
			  curCounterValue = 1;

		let appendedList = this.state.appendedList.map(function (item, index) {
			return (
				<li key={index} className="appended-person-list-item">
					<AppendedPerson onDeleteClick={that.handleDelete.bind(that, index)}/>
				</li>
			)
		});

		let handleAdultNumChange = function () {
			that.handleAdultNumChange.apply(that, arguments);
		};

		let handleChildNumChange = function () {
			that.handleChildNumChange.apply(that, arguments);
		};

		return (
			<div className="m-group-info">
				<div className="row">
					<div className="opt-header">
						<span className="title">出行人</span>
						<div className="amount-group">
							<ul className="amount-ctrl-list">
								<li className="amount-ctrl-list-item adult">
									<span>成人</span>
								</li>
								<li className="amount-ctrl-list-item">
									<Counter numChange={handleAdultNumChange} maxValue={maxCounterValue} curValue={curCounterValue}/>
								</li>
								<li className="amount-ctrl-list-item child">
									<span>儿童</span>
								</li>
								<li className="amount-ctrl-list-item">
									<Counter numChange={handleChildNumChange} maxValue={maxCounterValue} curValue="0"/>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="main-person-name">
						<div className="u-info-item">
							<input type="text" className="info-label person-name" placeholder="填写姓名"></input>
							<input type="number" className="info-value person-id" placeholder="请填写身份证号码"></input>
						</div>
					</div>
					<ul className="appended-person-list">
						{appendedList}
					</ul>
					<div className="main-person-id"></div>
					<div className="main-person-phone">
						<div className="u-info-item">
							<input type="text" className="info-label" value="联系电话" readonly></input>
							<input type="text" className="info-value" placeholder="请输入您的联系方式"></input>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class AppendedPerson extends Component {
  constructor(props) {
    super(props);
  }

  handleDelete(index) {
    this.props.onDeleteClick(index);
  }

  handleOpen(index) {
    this.props.onStatusChange(index);
  }

  render() {
    let item = this.props.item;
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
        onOpen={this.handleOpen.bind(this,this.props.index)}
        autoClose
        disabled={this.props.edit?true:false}
        contentStyle={!this.props.toClose || this.props.edit ?recoverStyle.swipeStyle:null}
        btnStyle={!this.props.toClose || this.props.edit ?recoverStyle.btnStyle:null}
      >
        <InfoItem />
      </SwipeOut>
    )
  }
}

class InfoItem extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const defaultPersonName = '填写姓名',
			  defaultPersonID = '请填写身份证号码',
			  defaultPersonNameVal = '',
			  defaultPersonIDVal = '';

		return (
			<div className="u-info-item">
				<input type="text" value={defaultPersonNameVal} className="info-label person-name" placeholder={defaultPersonName}></input>
				<input type="number" value={defaultPersonIDVal} className="info-value person-id" placeholder={defaultPersonID}></input>
			</div>
		)
	}
}
