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
    let priceDiv = function () {
      let priceInfo;
      if(0){  //团购
        priceInfo = (
          <div className="detail-price">
            <span className="price-single">¥{that.props.info.fightGroupPrice}起/人</span>
            <span className="price-intro">【10人起团】</span>
            <span className="price-line-through">¥{that.props.info.singlePrice}/人</span>
          </div>
        );
      }else{  //单独购买
        priceInfo = (
          <div className="detail-price">
            <span className="price-single">¥{that.props.info.singlePrice}/人</span>
          </div>
        );
      }

      return priceInfo;
    }

    return (
      <div className="m-route-detail-info">
        <div className="detail-title">{this.props.info.name}</div>
        <div className="detail-desc">{this.props.info.description}</div>
        {priceDiv()}
        {countDownDiv}
        <PlayIntro 
          handlePlayIntroClick={this.handlePlayIntroClick.bind(that)}
        />
        <Modal isShown={isModalShown} modalTpl={modalTpl}/>
      </div>
    )
  }
}
