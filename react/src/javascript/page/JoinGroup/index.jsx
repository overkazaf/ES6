import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from 'components/Gallery/Gallery'
import RouteDetailHeader from 'components/RouteDetail/RouteDetailHeader'
import RouteDetailInfo from 'components/RouteDetail/RouteDetailInfo'
import RouteDetailFooter from 'components/RouteDetail/RouteDetailFooter'
import RouteDetailExtendInfo from 'components/RouteDetail/RouteDetailExtendInfo'
import 'scss/base.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			hasCountDown: true,
			hasShareBtn: true,
			routeDetail : {
				imageList : [
					'http://img1.imgtn.bdimg.com/it/u=253167938,3006594503&fm=21&gp=0.jpg', 
					'http://pic16.nipic.com/20111007/8520906_130119649117_2.jpg', 
					'http://pic24.nipic.com/20121020/10653015_165154682160_2.jpg'
				]
			}
		};
	}

	handleBtnClickStretagy (clickType) {
		let stretagy = {
			'single' () {
				alert('single');
			},

			'group' () {
				alert('group');
			},
			'share' () {
				alert('share')
			}
		};

		stretagy[clickType]();
	}

	render () {
		let items = [
			'aaa.jpg',
			'bbb.jpg',
			'ccc.jpg',
			'ddd.jpg',
			'eee.jpg'
		];

		return (
			<div>
				<div>
					<RouteDetailHeader imageList={this.state.routeDetail.imageList}/>
					<RouteDetailInfo hasCountDown={this.state.hasCountDown} info={this.state.routeDetail}/>
				</div>
				<RouteDetailExtendInfo info={items} />
				<RouteDetailFooter hasShareBtn={this.state.hasShareBtn} handleClick={this.handleBtnClickStretagy}/>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);