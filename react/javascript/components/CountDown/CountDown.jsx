import React, {Component} from 'react';
import Util from "extend/util";
import './CountDown.scss'
import Status from 'extend/status';
import Notification from 'components/Notification/Notification';


export default 
class CountDown extends Component {

	constructor (props) {
		super(props);

		this.state = {
			status: this.props.status,
			endTime: this.props.endTime,
			countDown: null,
			remain: this.props.remain,
			enter: false,
			notice: ''
		};
	}

	componentWillMount(){
	    this.setState({
	    	start: new Date().getTime()
	    });
	}

	componentWillReceiveProps(nextProps) {
		
		let that = this;
	 	if (nextProps) {
	 		if (nextProps.endTime) {
	 			this.setState({
		 			endTime: nextProps.endTime,
		 			countDown: that.calcCountDown()
		 		}, () => {
		 			
		 		});
	 		}

	 		if (nextProps.remain) {
	 			this.setState({
		 			remain: nextProps.remain
		 		});
	 		}

	 		if (typeof nextProps.status != 'undefined') {
	 			//console.log('receieveProps in CountDown', nextProps);
	 			this.setState({
	 				status: nextProps.status
	 			});
	 		}
	 		
	 	}     
	}

	updateStatus (status) {
		let that = this;
		this.setState({
			status: status
		}, ()=>{
			//console.log('status has been updated successfully in countdown', that.state.status);
			
		});
	}

	componentDidMount() {
	 	let that = this;

	 	// 已经结束的倒计时就不需要使用定时器
 		that.timer = setInterval(function (){
 			if (that.state.remain == 0) {
 				clearInterval(that.timer);
 				that.timer = null;
 			} else {
 				that.setState({
					countDown : that.calcCountDown()
				}, ()=> {
				});
 			}
 		}, 1000);
	}

	updateEndTime (endTime) {
		 this.setState({
		 	endTime: endTime
		 });

		// alert('endTime has been setted in CountDown component:' + endTime);
	}

	updateRemain (remain) {
		this.setState({
		 	remain: remain
		 });
		// alert('remain has been setted in CountDown component:' + remain);
	}

	leave () {
		this.setState({
			enter: false
		});
	}

	// 拼团倒计时
	calcCountDown () {
		

		let endTimeSeconds = this.props.endTime;
		//let startTimeSeconds = Math.round(startTimeMillionSeconds/1000);
		//let endTimeSeconds = Math.round(endTimeSeconds/1000);

		//console.log('formatted start time', Util.formatTimestamp(startTimeSeconds));
		//console.log('formatted end time', Util.formatTimestamp(endTimeSeconds));
		//console.log('startTimeSeconds in calcCountDown', startTimeSeconds);

		let leftDays = 3;
		let secondsPerMinute = 60;
		let secondsPerHour = 60 * secondsPerMinute;
		let secondsPerDay = 24 * secondsPerHour;

		let leftDaySeconds = leftDays * secondsPerDay;
		let remainSeconds = (+endTimeSeconds - +(new Date().getTime()))/1000;

		let that = this;
		if (isNaN(remainSeconds)) {
			// document.title = 'remainSeconds is NaN'
			remainSeconds = 0;
		}
		//console.log('end date', Util.formatTimestamp(startTimeSeconds + leftDaySeconds));
		//console.log('current date', Util.formatTimestamp(new Date().getTime()));

		// 剩余天数、小时、分钟
		let remainDays = Math.floor(remainSeconds/secondsPerDay);
		let remainHours = Math.floor((remainSeconds - remainDays*secondsPerDay) / secondsPerHour);
		let remainMinutes = Math.floor((remainSeconds - remainDays*secondsPerDay - remainHours*secondsPerHour) / secondsPerMinute);
		let reSeconds = Math.round(remainSeconds % 60); 
		// console.log(remainDays);
		//document.title = remainDays;
		remainHours = remainDays * 24 + remainHours;
		let rd = remainDays < 10 ? '0' + remainDays : '' + remainDays;
		let rh = remainHours < 10 ? '0' + remainHours : '' + remainHours;
		let rm = remainMinutes < 10 ? '0' + remainMinutes : '' + remainMinutes;
		let rs = reSeconds < 10 ? '0' + reSeconds : '' + reSeconds;
		// 修正日期格式，补全前缀0

		return {
			days: rd,
			hours: rh,
			minutes: rm,
			seconds: rs
		};
	}

	isGroupFinished (countDown) {
		return this.state.remain == 0;
		//return !!countDown && (parseInt(countDown.days) == 0) && (parseInt(countDown.hours) == 0) && (parseInt(countDown.minutes) == 0) && (parseInt(countDown.seconds) == 0);
	}

	genRemainMessage () {
		let remain = this.state.remain;
		
		if (remain == 0) {
			//console.log('this.state.status', this.state.status);
			//console.log('this.state.status == Status.getStatusCodes().FAIL', this.state.status == Status.getStatusCodes().FAIL);
			if (this.state.status == Status.getStatusCodes().FAIL || this.props.status == Status.getStatusCodes().FAIL) {
				// 失败的场景
				return (
					<div>
						太可惜了，离成功只有一毫米的距离~
					</div>
				)
			} else {
				return (
					<div>
						来晚了，该团已组团成功。自己去开个团吧~
					</div>
				)
			}
			
		} else {
			return (
				<div>
					还差<span className="remain-counts">{remain}</span>人,等你就像干柴需要烈火
				</div>
			)
		}
		
	}

	render () {

		let {countDown} = this.state;
		let isFinished = this.isGroupFinished(countDown);
		let message = this.genRemainMessage();
		let days, hours, minutes, seconds;
		if (isFinished) {
			// 拼团成功后， 显示的信息应该为00,00,00
			days = '00';
			hours = '00';
			minutes = '00';
			seconds = '00';
		} else if (countDown) {
			days = countDown.days;
			hours = countDown.hours;
			minutes = countDown.minutes;
			seconds = countDown.seconds;
		}

		if (!countDown) {
			return (<div></div>);
		} else {
			return (
				<div className="u-group-count-down">
					<span className="board">
						剩余
						<span className="count-down-detail">
						<i className="time">{hours}</i> <i className="time-text">时</i>
							<i className="time">{minutes}</i> <i className="time-text">分</i>
							<i className="time">{seconds}</i> <i className="time-text">秒</i>
						</span>
						结束
					</span>
					<div ref="message" className="message">{message}</div>
				</div>
			)
		}
		
	}
}

