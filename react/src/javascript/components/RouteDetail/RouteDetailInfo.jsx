import React from 'react';
import 'scss/base.scss';
import './RouteDetailInfo.scss';

export default class RouteDetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      distance:'0M'
    }
  }

  render() {

    return (
      <div className="m-route-detail-info">
        routeDetailInfo
      </div>
    )
  }
}
