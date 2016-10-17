import React from 'react';
import Hammer from 'lib/hammer.min.js';
import Util from 'extend/util';
import className from 'classnames'
import "./Slider.scss"

export default class Slider extends React.Component {
  static defaultProps = {
    imageList: []
  };

  constructor() {
    super()
    this.state = {
      activeSlide: 0,
    }
  }

  nextSlide() {
    var slide = this.state.activeSlide + 1 < this.props.imageList.length ? this.state.activeSlide + 1 : 0;
    this.setState({
      activeSlide: slide
    })
  }

  previousSlide() {
    var slide = this.state.activeSlide - 1 < 0 ? this.props.imageList.length - 1 : this.state.activeSlide - 1;
    this.setState({
      activeSlide: slide
    });
  }

  componentDidMount() {
    var dom = this.refs.div;
    var hammer = new Hammer(dom, {});
    hammer.on('swipeleft', function () {
      this.nextSlide();
    }.bind(this));
    hammer.on('swiperight', function () {
      this.previousSlide();
    }.bind(this));

    setTimeout(function (){
      let $images = $('img');
      Util.lazyLoadImages($images, 2, 400);
    }, 50);     
  }

  render() {
    var _this = this;
    var slides = this.props.imageList;
    var activeIndex = this.state.activeSlide;
    var slide = slides.map(function (ele, index) {
      var classes = className({
        'slide': true,
        'active': index === activeIndex
      })
      if (index) {
        // 次页的图片懒加载
        return (
          <div id="scaleItem" className={classes} key={index}>
            <img data-src={ele} />
          </div>
        )
      } else {
        return (
          <div id="scaleItem" className={classes} key={index}>
            <img src={ele} />
          </div>
        )
      }
    })
    return (
      <div className="m-slider" ref='div'>
        {slide}
        <Dot activeIndex={this.state.activeSlide} slideslength={slides.length}/>
      </div>
    )
  }
}
class Dot extends React.Component {
  constructor() {
    super()
  }

  render() {
    let len = this.props.slideslength;
    if(len<=1){
      return null;
    }
    
    let activeIndex = this.props.activeIndex;
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(<span key={i} className={i === activeIndex ? 'active' : 'inactive'}></span>)
    }

    let spanWidth = (len * 0.15);
    let leftMargin = -(spanWidth/2) + 'rem';
    let style = {
      width: spanWidth + 'rem',
      marginLeft: leftMargin
    }
    return (
      <div className='dots' style={style}>
        {arr}
      </div>
    )
  }

}
