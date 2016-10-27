import React, {Component} from 'react'
import classNames from 'classnames'
import './NumCounter.scss'
import Hammer from 'lib/hammer.min.js'
export default
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minVal: this.props.minVal,
      maxVal: this.props.maxVal,
      curVal: this.props.curVal || 0
    }
  }

  componentDidMount(){
    var sub = this.refs.sub,
        add = this.refs.add;
    var sHammer = new Hammer(sub,{}),
        aHammer = new Hammer(add,{});
    sHammer.on("tap",function(){
      this.sub();
    }.bind(this));
    aHammer.on("tap",function(){
      this.add();
    }.bind(this))
  }

  handleNumChange() {
    if (this.props.numChange) {
      this.props.numChange(this.state.curVal);
    }
  }

  /**
   * [componentWillReceieveProps 更新Counter组件的值]
   * @Author   JohnNong
   * @Email    overkazaf@gmail.com
   * @Github   https://github.com/overkazaf
   * @DateTime 2016-09-11T19:06:11+0800
   * @param    {[type]}                     nextProps [description]
   * @return   {[type]}                               [description]
   */
  componentWillReceieveProps (nextProps) {
    if (nextProps.curVal) {
      this.setState({
        curVal: nextProps.curVal
      });
    }

    if (nextProps.maxVal) {
      this.setState({
        maxVal: nextProps.maxVal
      });
    }
  
  }

  add() {
    var curVal = +this.state.curVal + 1;
    if (curVal <= this.state.maxVal) {
      this.setState({
        curVal: curVal
      }, () => {
        this.handleNumChange(this.state.curVal);
      });
    }
  }

  sub() {
    var curVal = +this.state.curVal - 1;
    if (curVal >= this.state.minVal) {
      this.setState({
        curVal: curVal
      }, () => {
        this.handleNumChange(this.state.curVal);
      });
    }
  }

  updateMaxValue (val) {
    this.setState({
      maxVal: val
    });
  }

  setCurrentValue (val) {
    this.setState({
      curVal: val
    });
  }


  render() {
    let curValue = +this.state.curVal;
    let lessClazz = (curValue == this.state.minVal) ? 'icon-less disabled' : 'icon-less enabled'; 
    let moreClazz = (curValue == this.state.maxVal) ? 'icon-more disabled' : 'icon-more enabled'; 
    return (
      <div className='m-counter'>
        <div className={lessClazz} ref="sub"></div>
        <div className='num'>{curValue}</div>
        <div className={moreClazz} ref="add"></div>
      </div>
    )

  }
}