import React, {Component} from 'react';
import './PayMethod.scss';


export default class PayMethod extends Component {
	constructor (props) {
		super(props);

		this.state = {
			payMethod: {
				weixin: true
			},
			invoice: {
				checked : false
			},
			protocol: {
				checked: true
			},
			totalPrice: '2099.00'
		};
	}

	changeInvoice () {
		alert('checked::' + this.state.invoice.checked);

		this.setState({
			invoice : {
				checked : !this.state.invoice.checked
			}
		})
	}

	changeProtocol () {
		this.setState({
			protocol : {
				checked : !this.state.protocol.checked
			}
		})
	}


	render () {

		let invoiceTitle, //发票
			protocol, // 平台协议
			totalPrice = this.state.totalPrice;

		if (this.state.invoice.checked) {
			invoiceTitle = <input className="chk-component" type="checkbox" onClick={this.changeInvoice.bind(this)} checked />;
		} else {
			invoiceTitle = <input className="chk-component" type="checkbox" onClick={this.changeInvoice.bind(this)} />;
		}


		if (this.state.protocol.checked) {
			protocol = <input className="chk-component" type="checkbox" onClick={this.changeProtocol.bind(this)}  checked />;
		} else {
			protocol = <input className="chk-component" type="checkbox" onClick={this.changeProtocol.bind(this)} />;
		}

		return (
			<div className="m-pay-method">
				<div className="title">支付方式</div>
				<section className="pay-info slashed">
					<div>
						<input type="radio" className="chk-component" checked />
						微信支付
					</div>
				</section>

				<section className="pay-info">
					<div>
						{invoiceTitle}
						开具增值税发票（发票将在开团成功后5日寄出）
					</div>
					<div>
						<input type="text" className="invoiceTitle" placeholder="输入发票抬头" />
					</div>
				</section>
				<section className="pay-info gray">
					{protocol}
					我同意《一起逛平台服务协议》
				</section>
				<div className="pay-now">
					<div className="total-price">
						合计 <span className="price">￥{totalPrice}</span>
					</div>
					<div className="pay-btn">
						立即（开团）支付
					</div>
				</div>
			</div>
		)
	}
}