import React, {Component} from 'react';
import './Alert.scss';

export default class Alert extends Component {
	constructor(props){
		super(props);
		this.state = {
			shown: false,
			title: this.props.title || '警告操作',
			message: this.props.message || '警告信息',
			okText: this.props.okText || '确定'
		};
	}

	componentWillReceiveProps(nextProps) {
	 	if (nextProps) {
	 		if (typeof nextProps.message != 'undefined') {
	 			this.setState({
	 				message: nextProps.message
	 			});
	 		}
	 	}     
	}

	showAlertBox (title, message) {
		this.setState({
			title: title,
			message: message,
			shown: true
		})
	}

	handleOK () {
		this.setState({
			shown: false
		});
	}

	render() {
		let {
			title,
			okText,
			message,
			shown
		} = this.state;

		let alertMaskClazz = !!shown? 'm-alert-mask' : 'm-alert-mask hide';
		let alertBoxClazz = !!shown? 'm-alert' : 'm-alert hide';
		let titleContent = title == '' ? '' : <h3 className="m-header-title">{title}</h3>;
 		let maskStyleObj = !!shown? {
 			height: $(document).height()
 		} : null;

 		let boxStyleObj = !!shown? {
 			top: +document.body.scrollTop + (parseInt(document.documentElement.clientHeight)/2) + 'px'
 		} : null;

		return (
			<div>
			<div className={alertMaskClazz} style={maskStyleObj}>
			</div>
			<div className={alertBoxClazz} style={boxStyleObj}>
				<div className="m-alert-header">
					{titleContent}
				</div>
					<div className="m-alert-body">{message}</div>
					<div className="m-alert-footer">
					<div className="btn-ok" onClick={this.handleOK.bind(this)}>{okText}</div>
					</div>
			</div>
			</div>
		)
	}
}