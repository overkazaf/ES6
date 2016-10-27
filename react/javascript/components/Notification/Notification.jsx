import React from 'react';
import './notification.scss';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShow: false};
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.enter && nextProps.enter) {
      this.enter();
    } else if (this.props.enter && !nextProps.enter) {
      this.leave();
    }
  }

  enter() {
    this.setState({isShow: true});
  }

  leave() {
    this.setState({isShow: false});
  }

  render() {
    let style = {
      display: this.state.isShow ? 'block' : 'none'
    }
    return (
      <div className="m-notify" style={style}>
        <div className="mask" onClick={this.props.leave}></div>
        <div className="text">{this.props.children}</div>
      </div>
    )
  }
}