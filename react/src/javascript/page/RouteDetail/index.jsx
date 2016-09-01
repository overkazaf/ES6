import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from 'components/Gallery/Gallery'
import Header from 'components/Header/Header'
import RouteDetailHeader from 'components/RouteDetail/RouteDetailHeader'
import RouteDetailInfo from 'components/RouteDetail/RouteDetailInfo'
import 'scss/base.scss'


class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			routeDetail : {
				imageList : [
					'http://img1.imgtn.bdimg.com/it/u=253167938,3006594503&fm=21&gp=0.jpg', 
					'http://pic16.nipic.com/20111007/8520906_130119649117_2.jpg', 
					'http://pic24.nipic.com/20121020/10653015_165154682160_2.jpg'
				]
			}
		};
	}

	render () {
		let items = [
			'aaa.jpg',
			'bbb.jpg',
			'ccc.jpg',
			'ddd.jpg',
			'eee.jpg'
		];
		let title = '团购行程';
		let leftBtn = {},
			rightBtn = {};

		return (
			<div>
				<Header title={title} leftBtn={leftBtn} rightBtn={rightBtn} />
				<div>
					<RouteDetailHeader imageList={this.state.routeDetail.imageList}/>
					<RouteDetailInfo info={this.state.routeDetail}/>
				</div>
				<div className="route-extra-info">
					<Gallery pics={items} />
				</div>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);