import React from 'react';
import PlayIntro from 'components/PlayIntro/PlayIntro';
import 'scss/base.scss';
import './RouteDetailInfo.scss';

export default class RouteDetailInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="m-route-detail-info">
        <div className="detail-title">千岛湖国庆家庭主题3日游</div>
        <div className="detail-desc">
          骑行、烤鱼、水下古城，带你领略真正的千岛湖，豪华湖景房，看一看久违的星星，线路产品描述，水下古城……
        </div>
        <div className="detail-price">
          <span className="price-single">¥899起/人</span>
          <span className="price-intro">[十人起团]</span>
          <span className="price-line-through">￥1550/人</span>
        </div>
        <PlayIntro />
      </div>
    )
  }
}
