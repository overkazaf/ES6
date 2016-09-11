import React, {Component} from 'react';
import Slide from 'components/Slide/Slide'
import 'scss/base.scss';
import './RouteDetailHeader.scss';

export default 
class RouteDetailHeader extends Component {
  static defaultProps = {
    routeDetail: {
      imageList: [
        'aaa.mp4',
        'aaa.jpg',
        'bbb.jpg',
        'ccc.jpg'
      ]
    }
  };

  render() {

    return (
      <div className='m-route-detail-header'>
        <Slide imageList={this.props.imageList} />
      </div>
    )
  }
}