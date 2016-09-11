import React, {Component} from 'react'
import classNames from 'classnames'
import './NumCounter.scss'
import Hammer from 'lib/hammer.min.js'
export default
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: props.curValue || 1
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
    this.props.numChange(this.state.num);
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
    console.log('componentWillReceieveProps', nextProps);
    if (nextProps.curValue) {
      this.setState({
        num: nextProps.curValue
      });
    }
  }

  add() {
    var num = +this.state.num + 1;
    if (num <= this.props.maxValue) {
      this.setState({
        num: num
      }, () => {
        this.handleNumChange(this.state.num);
      });
    }
  }

  sub() {
    var num = +this.state.num - 1;
    if (num >= 1) {
      this.setState({
        num: num
      }, () => {
        this.handleNumChange(this.state.num);
      });
    }
  }
  render() {
    var maxValue = +this.props.maxValue;
    var curValue = +this.state.num;
    return (
      <div className='m-counter'>
        <div className="icon-less" ref="sub">-</div>
        <div className='num'>{this.state.num}</div>
        <div className="icon-more" ref="add">+</div>
      </div>
    )

  }
}