import React, {Component} from 'react'
import './Entry.scss'
export default
class Entry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked : false
    }
  }

  handleClick () {
    this.setState({
      clicked : !this.state.clicked
    });
  };
  render() {
    let styleObj = {background: this.state.clicked? '#09f':'#ccc'};
    return (
      <button className="entry" style={styleObj} onClick={this.handleClick.bind(this)}>
        {this.props.name}
      </button>
    )
  }
}