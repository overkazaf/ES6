import React, {Component} from 'react';
import './Modal.scss';


/**
 * 模态窗组件，传入动态的tpl模板和事件监听器以扩展模态窗组件的功能
 */
export default class Modal extends Component {


	constructor (props) {
		super(props);

		let modalStatus = this.props.modalStatus || {
			header : true,
			body : true,
			footer : false
		};

		this.state = {
			isShown: false,
			modalStatus: modalStatus
		};

		let that = this;
		setTimeout(function () {
			that.show();
		});
	}

	show () {
		this.setState({
			isShown : true
		})
	}

	hide () {
		this.setState({
			isShown : false
		})
	}


	getBodyHeight () {
		return $(document).height();
	}


	handleClose () {
		this.hide();
	}

	handleCancel () {
		this.hide();
	}

	handleModalConfirm () {
		if (this.props.handleModalConfirm) {
			this.props.handleModalConfirm();
		}
		this.hide();
	}

	render () {
		let {
				isShown, 
				modalTpl, 
				modalStatus
			} = this.state,
			that = this,
			modalTitle = this.props.title || 'Testing modal title',
			maskClazz = !!isShown ? 'm-modal-mask' : 'm-modal-mask hide',
			modalDialogClazz = !!isShown ? 'm-modal-dialog' : 'm-modal-dialog hide',
			modalHeaderClazz = !!modalStatus.header ? 'm-modal-header' : 'm-modal-header hide',
			modalBodyClazz = !!modalStatus.body ? 'm-modal-body' : 'm-modal-body hide',
			modalFooterClazz = !!modalStatus.footer ? 'm-modal-footer' : 'm-modal-footer hide',
			bodyHeight = this.getBodyHeight(),
			maskStyleObj = {
				position: 'absolute',
				left : 0,
				top : 0,
				width: '100%',
				height: bodyHeight + 'px',
				bacgkround: '#000',
				opacity: 0.7
			},

			modalDialogStyleObj = {
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: "translate(-50%,-50%)"
			},
			handleClose = function () {
				that.handleClose();
			},
			handleCancel = function () {
				that.handleCancel();
			},
			handleModalConfirm = function () {
				that.handleModalConfirm();
			}

		return (
			<div>
				<div className={maskClazz} style={maskStyleObj}></div>
				<div className={modalDialogClazz} style={modalDialogStyleObj}>
					<span className="modal-close" onClick={handleClose}>x</span>
					<div className={modalHeaderClazz}>
						<h2>{modalTitle}</h2>
					</div>
					<div className={modalBodyClazz}>
						<p>
							Modal Body Here
						</p>
					</div>
					<div className={modalFooterClazz}>
						<div className="modal-button-group">
							<button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
							<button onClick={handleModalConfirm} className="btn btn-confirm">Confirm</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
