import React from 'react';
import PlayIntro from 'components/PlayIntro/PlayIntro';
import GroupCountDown from 'components/GroupCountDown/GroupCountDown';
import Modal from 'components/Modal/Modal';
import 'scss/base.scss';
import './RouteDetailInfo.scss';

export default class RouteDetailInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal : {
        isShown : false,
        modalTpl : {
          body: function (){
            return (
              <div className="play-intro-img"></div>
            )
          }
        }
      }
    }
  }

  handlePlayIntroClick () {
    // 获取当前组件的context, 把Modal的state传递过去
    this.setState({
      modal : {
        isShown: true,
        modalTpl : {
          body: function (){
            return (
              <div className="play-intro-img"></div>
            )
          }
        }
      }
    });
  }

  render() {
    let hasCountDown = this.props.hasCountDown;
    let countDownDiv;
    let that = this;
    let modalTpl = this.state.modal.modalTpl;
    let isModalShown = !!this.state.modal.isShown;
    let demoList = [
        {url: 'aaa.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: true},
        {url: 'bbb.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ccc.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'ddd.jpg', size: 2, startTime:'2016-09-19 23:43:20', isLeader: false},
        {url: 'jjj.jpg', size: 3, startTime:'2016-09-19 23:43:20', isLeader: false}
      ];

    if (hasCountDown) {
      countDownDiv = <GroupCountDown list={demoList} />
    } else {
      countDownDiv = null;
    }

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
        {countDownDiv}
        <PlayIntro 
          handlePlayIntroClick={this.handlePlayIntroClick.bind(that)}
        />
        <Modal isShown={isModalShown} modalTpl={modalTpl}/>
      </div>
    )
  }
}
