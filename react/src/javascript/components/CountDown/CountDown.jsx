import React, {Component} from 'react'
import './CountDown.scss'

export default 
class CountDown extends Component {
	constructor (props) {
		super(props);

		console.log('this.calcCountDown()', this.calcCountDown())
		this.state = {
			countDown: this.calcCountDown()
		};
	}

	// 拼团倒计时
	calcCountDown () {
		let startTimeSeconds = this.props.startTime;
		let leftDays = 3;
		let secondsPerDay = 24*60*60;
		let secondsPerHour = 60*60;
		let secondsPerMinute = 60;

		let leftDaySeconds = leftDays * secondsPerDay;
		let remainSeconds = startTimeSeconds + leftDaySeconds - (new Date().getTime());

		// 剩余天数
		let remainDays = Math.floor(remainSeconds/secondsPerDay);
		let remainHours = Math.floor((remainSeconds - remainDays*secondsPerDay) / secondsPerHour);
		let remainMinutes = Math.floor((remainSeconds - remainDays*secondsPerDay - remainHours*secondsPerHour) / secondsPerMinute);


		let rd = remainDays < 10 ? '0' + remainDays : '' + remainDays;
		let rh = remainHours < 10 ? '0' + remainHours : '' + remainHours;
		let rm = remainMinutes < 10 ? '0' + remainMinutes : '' + remainMinutes;

		// 修正日期格式

		return {
			days: rd,
			hours: rh,
			minutes: rm
		};
	}

	componentDidMount () {
		let that = this;
		setTimeout(function (){
			that.setState({
				countDown : that.calcCountDown()
			});
		}, 60 * 1000);
	}

	isGroupFinished (cd) {
		return (parseInt(cd.days) === 0) && (parseInt(cd.hours) === 0) && (parseInt(cd.minutes) === 0);
	}

	render () {

		let countDown = this.state.countDown;
		let message = this.isGroupFinished(countDown)? '拼团倒计时已完成' : '拼团倒计时未完成';
		
		return (
			<div className="u-group-count-down">
				<span className="board">
					剩余
					<span className="count-down-detail">
						<i className="time">{countDown.days}</i>天
						<i className="time">{countDown.hours}</i>时
						<i className="time">{countDown.minutes}</i>分
					</span>
					结束
				</span>
				<div className="message">{message}</div>
			</div>
		)
	}
}

