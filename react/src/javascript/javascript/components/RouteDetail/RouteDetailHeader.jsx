import React, {Component} from 'react';
import Slide from 'components/Slide/Slide';
import Util from 'lib/util';
import 'scss/base.scss';
import './RouteDetailHeader.scss';

export default 
class RouteDetailHeader extends Component {
  static defaultProps = {
    routeDetail: {
      imageList: [
        '../../../res/images/RouteDetail/places/swim/bannerNew1@3x.png',
        '../../../res/images/RouteDetail/places/swim/bannerNew2@3x.png',
        '../../../res/images/RouteDetail/places/swim/bannerNew3@3x.png',
        '../../../res/images/RouteDetail/places/swim/bannerNew4@3x.png'
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