import React from 'react';
import Tab from 'components/Tab/Tab';
import ExtendInfo from './ExtendInfo';
import 'scss/base.scss';
import './RouteDetailExtendInfo.scss';

export default class RouteDetailExtendInfo extends React.Component {
  constructor(props) {
    super(props);

    if (!!this.props.info) {
      this.state =  this.props.info;
    }else{
      this.state = {
        activeIndex : 0,
        tabStatus : ['行程安排', '产品特色', '费用说明'],
        currentTabItems : [
          {
            href: '#schedule',
            name: '行程安排',
            headImage : 'aaa.jpg',
            scheduleList : [
              {
                id: 1,
                dayName: '第一天',
                placeList : [
                  {
                    placeName: "九龙溪漂流",
                    placeDesc: "水里“疯”个够",
                    placeIconClazz: 'icon-1',
                    placeIcon: 'xxx.jpg',
                    placeImageList : [
                      '../../../res/images/RouteDetail/places/drift/banner1@3x.png',
                      '../../../res/images/RouteDetail/places/drift/banner2@3x.png',
                      '../../../res/images/RouteDetail/places/drift/banner3@3x.png'
                    ]
                  },
                  {
                    placeName: "风铃驿站",
                    placeDesc: "体验千岛民俗独特韵味",
                    placeIconClazz: 'icon-2',
                    placeIcon: 'yyy.jpg',
                    placeImageList : [
                      '../../../res/images/RouteDetail/places/station/station1@3x.jpg',
                      '../../../res/images/RouteDetail/places/station/station2@3x.jpg',
                      '../../../res/images/RouteDetail/places/station/station3@3x.jpg',
                      '../../../res/images/RouteDetail/places/station/station4@3x.jpg'
                    ]
                  },
                  {
                    placeName: "推荐：风铃驿站农家菜",
                    placeDesc: "千岛湖鱼头美味",
                    placeIconClazz: 'icon-3',
                    placeIcon: 'yyy.jpg',
                    placeImageList : [

                      '../../../res/images/RouteDetail/places/food/banner2@3x.png',
                      '../../../res/images/RouteDetail/places/food/banner3@3x.png',
                      '../../../res/images/RouteDetail/places/food/banner4@3x.png',
                      '../../../res/images/RouteDetail/places/food/banner5@3x.png'
                    ]
                  }
                ]
              },
              {
                id: 2,
                dayName: '第二天',
                placeList : [
                  {
                    placeName: "推荐：千汾公路观光",
                    placeDesc: "中国的濑户内海",
                    placeIconClazz: 'icon-1',
                    placeIcon: 'yyy.jpg',
                    placeImageList : [
                      '../../../res/images/RouteDetail/places/road/banner1@3x.png',
                      '../../../res/images/RouteDetail/places/road/banner2@3x.png',
                      '../../../res/images/RouteDetail/places/road/banner3@3x.png'
                    ]
                  },
                  {
                    placeName: "文渊狮城",
                    placeDesc: "探寻千年水下古城",
                    placeIconClazz: 'icon-1',
                    placeIcon: 'yyy.jpg',
                    placeImageList : [
                      '../../../res/images/RouteDetail/places/city/city1@3x.jpg',
                      '../../../res/images/RouteDetail/places/city/city2@3x.jpg',
                      '../../../res/images/RouteDetail/places/city/city3@3x.jpg',
                      '../../../res/images/RouteDetail/places/city/city4@3x.jpg',
                      '../../../res/images/RouteDetail/places/city/city5@3x.jpg'
                    ]
                  },
                  {
                    placeName: "铂瑞酒店",
                    placeDesc: "徽式庭院豪华别墅房　中式风格五星级酒店",
                    placeIconClazz: 'icon-3',
                    placeIcon: 'yyy.jpg',
                    placeImageList : [
                      '../../../res/images/RouteDetail/places/hotel/hotel1@3x.jpg',
                      '../../../res/images/RouteDetail/places/hotel/hotel2@3x.jpg',
                      '../../../res/images/RouteDetail/places/hotel/hotel3@3x.jpg',
                      '../../../res/images/RouteDetail/places/hotel/hotel4@3x.jpg'
                    ]
                  }
                ]
              },
              {
                id: 3,
                dayName: '第三天',
                placeList : [
                  
                  {
                    placeName: "龙川湾",
                    placeDesc: "欣赏“湖中有岛，岛中有湖”的胜景",
                    placeIconClazz: 'icon-1',
                    placeIcon: 'yyy.jpg',
                    placeImageList : [
                      '../../../res/images/RouteDetail/places/lake/banner1@3x.png',
                      '../../../res/images/RouteDetail/places/lake/banner2@3x.png',
                      '../../../res/images/RouteDetail/places/lake/banner3@3x.png'
                    ]
                  }
                ]
              }
            ]
          },
          {
            href: '#feature',
            name: '产品特色',
            headImage : 'aaa.jpg',
            imageUrl : 'feature.jpg'
          },
          {
            href: '#fee',
            name: '费用说明',
            headImage : 'aaa.jpg',
            imageUrl : 'fee.png'
          }
        ]
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.info) {
        this.setState(nextProps.info);
      }
    }
  }

  handleTabChange (item, index) {
    let ctx = this.context;
    ctx.setState({
      activeIndex: index
    });

    let href = ctx.state.currentTabItems[index].href;
    gotoHref(href);
  }

  render() {
    let {
      tabStatus,
      activeIndex,
      currentTabItems
    } = this.state;
    let that = this;


    return (
      <div className="m-route-detail-extend-info">
        <Tab 
          tabs={tabStatus} 
          activeIndex={activeIndex}
          context={that}
          handleItemClick={this.handleTabChange}/>
        <ExtendInfo info={currentTabItems}/>
      </div>
    )
  }
}

function gotoHref (href) {
  let top = $('a[id="'+href+'"]').offset().top;
  let fixedTop = parseInt(top) - 60;
  $("html,body").animate({"scrollTop":fixedTop + 'px'});
}
 