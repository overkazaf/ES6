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
      },
      status: status,
      list : this.props.list,
      remain: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.list) {
        this.setState({
          list : nextProps.list
        });
      }

      if (nextProps.remain) {
        this.setState({
          remain : nextProps.remain
        });
      }

      if (nextProps.endTime) {
        this.setState({
          endTime : nextProps.endTime
        });
      }

      if (typeof nextProps.status != 'undefined') {
        this.setState({
          status: nextProps.status
        });
      }
      
    } 
  }

  updateEndTime (endTime) {
    this.setState({
      endTime : endTime
    });

    this.refs['groupCountDown'].updateEndTime(endTime);
  }

  updateRemain (remain) {
    this.setState({
      remain : remain
    });

    this.refs['groupCountDown'].updateRemain(remain);
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
    let {remain, endTime, status} = this.state;
    let countDownDiv;
    let that = this;
    let modalTpl = this.state.modal.modalTpl;
    let isModalShown = !!this.state.modal.isShown;
    let personList = this.props.list || this.state.list || [];

    if (hasCountDown) {
      countDownDiv = <GroupCountDown
                      ref="groupCountDown" 
                      status={status}
                      remain={remain}
                      endTime={endTime}
                      list={personList} />
    } else {
      countDownDiv = null;
    }

    return (
      <div className="m-route-detail-info">
        <div className="detail-title">千岛湖3日2晚自驾休闲游</div>
        <div className="detail-desc">
          国庆避开人群，邂逅千岛湖一处静谧之地，狮城铂瑞酒店，给你一个安静舒心的旅行度假体验。
        </div>
        <div className="detail-price">
          <span className="price-single">¥998起/人</span>
          <span className="price-intro">【10人起团】</span>
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
