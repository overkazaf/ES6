import React, {Component} from 'react';
import SwipeOut from 'components/SwipeOut/SwipeOut';

export default class AppendedList extends Component{
	constructor (props) {
		super(props);

		this.state = {
			list : this.props.list
		};
	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps.list) {
	 		this.setState({
	 			list: nextProps.list
	 		}, ()=> {
	 			console.log('setting state in AppendedList', nextProps.list);
	 		});
	 	}     
	}

	updatePersonInfo () {
		if (this.props.updatePersonInfo) {
			this.props.updatePersonInfo.apply(this.props.parentContext, Array.prototype.slice.call(arguments));
		}
	}

	handleAdultDelete () {
		if (this.props.handleAdultDelete) {
			this.props.handleAdultDelete.apply(this.props.parentContext, Array.prototype.slice.call(arguments));
		}
	}

	render () {
		let that = this;
		let list = this.state.list.map(function (item, index) {
			return (
				<li key={index} className="appended-person-list-item">
					<AppendedPerson
					index={index}
					name={item.name}
					id={item.id}
					handleChange={that.updatePersonInfo.bind(that)}
					onDeleteClick={that.handleAdultDelete.bind(that, index)}/>
				</li>
			)
		});

		return (
			<ul className="appended-person-list">
				{list}
			</ul>
		);
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

	render () {
		const defaultPersonName = '填写姓名',
			  defaultPersonID = '请填写身份证号码',
			  nameVal = this.state.name,
			  idVal = this.state.id,
			  that = this;

		return (
			<div className="u-info-item">
				<input type="text" onChange={that.updateNameValue.bind(that)} ref="inpName" className="info-label person-name" placeholder={defaultPersonName} maxLength="4" value={nameVal}></input>
				<input type="text" onChange={that.updateIDValue.bind(that)} ref="inpID" className="info-value person-id" placeholder={defaultPersonID} maxLength="18" value={idVal}></input>
			</div>
		)
	}
}
