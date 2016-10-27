import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Util from "extend/util";
import Hook from 'extend/hook';
import 'scss/base.scss';
import 'scss/RouteThumbnail/index.scss';

class MyComponent extends Component {
	constructor (props) {
		super(props);
		this.state = {"imgURLs":[]}
	}

	componentDidMount() {
		let imgURLs = [
				"E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteList/list/home-page_2@3x.jpg",
				"E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteList/list/home-page_4@3x.jpg",
				"E:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/fightgroup-web/public/res/images/RouteList/list/home-page_3@3x.jpg",
			];
		imgURLs = Hook.hookAndFixUrlPrefix(imgURLs);

		this.setState({
			"imgURLs": imgURLs
		}, ()=> {
			$('.thumbnail').each(function(index){
				$(this).css({'background':`url(${imgURLs[index]}) no-repeat`,'background-size': '100%'});
			})
		});


	}

	render () {
		let imgURLs = this.state.imgURLs;

		let tagA = [];
		imgURLs.map( function (item,index) {
			tagA.push(
				<li key={index}>
					<a href={'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/RouteDetail/index.html?routeId='+(index+2)}><div className="thumbnail"></div></a>
				</li>
			);
		});
		
		return (
			<div>
				<ul className="m-routethumbnail">
					{tagA}
				</ul>
				<div className='getMore'>
					<div className='getMore-text'>更多行程即将上线</div>
					<div className='getMore-icon'></div>
				</div>
			</div>
		)
	}
}


function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);