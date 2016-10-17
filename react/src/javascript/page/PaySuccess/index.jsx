import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Util from "extend/util";
import PayStatusHeader from 'components/PayStatus/Header/Header';
import PayStatusBody from 'components/PayStatus/Body/Body';
import PayStatusFooter from 'components/PayStatus/Footer/Footer';
import 'scss/base.scss';
import 'scss/PaySuccess/index.scss';

class MyComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			data: null
		};
	}

	componentDidMount() {
		let that = this;
		let detailId = Util.fetchParamValueByCurrentURL('detailId');
		console.log('detailId', detailId);
	 	if (detailId) {
	 		let reqParam = {
	 			url: 'tour/order',
	 			method: 'get',
	 			data: {
	 				detailId: detailId
	 			},
	 			successFn: function (result) {
	 				if (Util.isResultSuccessful(result.success)) {
	 					that.renderRouteDesc(result.data);
	 				}
	 			},
	 			errorFn: function () {
	 				console.error.apply(this, [...arguments]);
	 			}
	 		};

	 		Util.fetchData(reqParam);
	 	}     
	}

	renderRouteDesc (data) {	
		this.setState({
			data: data
		});
	}


	render () {
		let data = this.state.data;
		return (
			<div className="m-paysuccess">
				<PayStatusHeader />
				<PayStatusBody info={data}/>
				<PayStatusFooter />
			</div>
		)
	}
}

function doRender () {
	ReactDOM.render(<MyComponent /> , document.getElementById("app"));
}

setTimeout(doRender, 16);