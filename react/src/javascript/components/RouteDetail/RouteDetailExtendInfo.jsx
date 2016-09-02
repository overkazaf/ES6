import React from 'react';
import Tab from 'components/Tab/Tab';
import ExtendInfo from './ExtendInfo';
import 'scss/base.scss';
import './RouteDetailExtendInfo.scss';

export default class RouteDetailExtendInfo extends React.Component {
  constructor(props) {
    super(props);

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
                  placeIcon: 'xxx.jpg',
                  placeImageList : [
                    'aaa.jpg',
                    'bbb.jpg',
                    'ccc.jpg',
                    'ddd.jpg'
                  ]
                }
              ]
            },
            {
              id: 2,
              dayName: '第二天',
              placeList : [
                {
                  placeName: "小院农家菜",
                  placeDesc: "千岛湖鱼头美味",
                  placeIcon: 'yyy.jpg',
                  placeImageList : [
                    'aaa.jpg',
                    'bbb.jpg',
                    'ccc.jpg',
                    'ddd.jpg'
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
          imageUrl : 'fee.jpg'
        }
      ]
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
  let fixedTop = parseInt(top) - 44; // 减去头部图片的高度
  $("html,body").animate({"scrollTop":fixedTop + 'px'});
}
