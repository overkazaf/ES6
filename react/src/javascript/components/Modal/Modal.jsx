import React, {Component} from 'react';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import './Modal.scss';


export default class Modal extends Component {


	consturctor (props) {
		super(props);
	}

	getInitialState () {
		return {
			isShown : false
		}
	}


	getModalDefaults () {
		return {
			header: '<ModalHeader />',
			body: '<ModalBody />',
			footer: '<ModalFooter />'
		}
	}

	init (tpl) {
		this.setState({
			modalTpl : {
				header : tpl.header,
				body : tpl.body,
				footer : tpl.footer
			},
			modalStatus : {
				header : false,
				body : false,
				footer : false
			}
		})
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
		return $('body').height();
	}


	handleClose () {
		this.hide();
	}

	handleClick (type) {
		switch (type) {
			case 'cancel' : 
				this.hide();
				break;
			case 'confirm':
				if (this.props.handleModalConfirm) {
					this.props.handleModalConfirm();
				}
				this.hide();
				break;
		}
	}

	render () {
		let {
				isShown, 
				modalTpl, 
				modalStatus
			} = this.state,
			modalDefaults = this.getModalDefaults(),
			maskClazz = isShown ? 'm-modal-mask shown' : 'm-modal-mask',
			modalHeaderClazz = isShown ? 'm-modal-header shown' : 'm-modal-header',
			modalBodyClazz = isShown ? 'm-modal-body shown' : 'm-modal-body',
			modalFooterClazz = isShown ? 'm-modal-footer shown' : 'm-modal-footer',
			bodyHeight = this.getBodyHeight(),
			maskStyleObj = {
				position: 'absolute',
				left : 0,
				top : 0,
				width: '100%',
				height: bodyHeight + 'px',
				backgroundColor: '#000',
				opacity: 0.5
			},

				modalDialogStyleObj = {
				position : 'relative',
				marign: '10px auto',
				minWidth: '240px',
				width: '90%',
				minHeight: '320px',
				height: 'auto'
			};

		return (
			<div className={maskClazz} style={maskStyleObj}>
				<div className="m-modal-dialog" style={modalDialogStyleObj}>
					<div className={modalHeaderClazz}>
						{modalTpl.header || modalDefaults.header}
					</div>
					<div className={modalBodyClazz}>
						{modalTpl.body || modalDefaults.body}
					</div>
					<div className={modalFooterClazz}>
						{modalTpl.footer || modalDefaults.footer}
					</div>
				</div>
			</div>
		)
	}

}
