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
    let styleShop = {};
    let styleInfo = {}
    let baseSize = parseInt(document.documentElement.style.fontSize, 10);
    let heightS = (baseSize * 2.12 + 20) + "px";
    let heightI = (baseSize * 0.35 + 20) + "px";
      styleShop = {
        height: heightS
      }
      styleInfo = {
        marginTop: heightI
      }

    return (
      <div className='m-route-detail-header' style={styleShop}>
        <Slide imageList={this.props.imageList} />
      </div>
    )
  }
}