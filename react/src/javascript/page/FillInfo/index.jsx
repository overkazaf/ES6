import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Util from 'extend/util';
import WeixinUtil from 'extend/WeixinUtil';
import InfoForm from 'components/InfoForm/InfoForm';
import InfoAdaptor from 'extend/adaptor/InfoAdaptor';
import 'scss/base.scss';
import 'scss/FillInfo/index.scss';


class MyComponent extends Component {
	constructor (props) {
		super(props);
		if (typeof __ftlData__ != 'undefined') {
			// freeMarker
			let adaptor = new InfoAdaptor(__ftlData__);
			this.state = {
				data: adaptor.getData()
			};
		}
	}

	componentDidMount () {
		Util.inPage();

		let userId = Util.parseQueryString(location.href)['user'];
		if (userId) {
			Util.setCurrentUserId(userId);
		}

		WeixinUtil.initWeixinJSBridge(function(config){
			WeixinUtil.hideOptionMenu();
		});


		Util.fixFixed();

		Util.addUserPageInfoUploadListener();
	}

	render () {
		let infoData = typeof __ftlData__ == 'undefined' ? null : this.state.data;
		let json = require('mock/fill-info.json');
		let data = json.result?json.data:null;
		let formData = {
			canSelect: true,
			form: data.conditions,
			isGroup: Util.isGroup()
		};
		return (
			<div className="m-fill-info">
				<InfoForm 
					form={formData}
					info={infoData}
				/>
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);