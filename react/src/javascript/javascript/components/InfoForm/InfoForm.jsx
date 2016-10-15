import React, {Component} from 'react';
import GroupInfo from './GroupInfo';
import PersonInfo from './PersonInfo';
import FeeList from './FeeList';
import DistServices from './DistServices';
import ReadyPayInfo from './ReadyPayInfo';
import Notification from 'components/Notification/Notification';
import InfoValidator from 'lib/validator/InfoValidator';
import Util from 'lib/util';
import WeixinUtil from 'lib/WeixinUtil';
import './InfoForm.scss';
import 'scss/base.scss';

let selectedIndexMap = {
	'groupSize' : {
		'6' : 0,
		'10' : 1,
		'12' : 2
	},
	'travelAddress' : {
		'杭州' : 0,
		'上海' : 1,
		'南京' : 2
	},
	'travelTime' : {
		'1475251200000' : 0,
		'1475337600000' : 1,
		'1475424000000' : 2
	}
};

let adultMaxValueLimitArray = [9,12,15];
export default class InfoForm extends Component {

	constructor (props) {
		super(props);
		let defaults = {
			info: {
				group: {
					groupSizes: ['6-9人', '10-12人', '12-15人'],
					originPlaces: ['杭州', '上海', '南京'],
					leavedDates: ['10月1日', '10月2日', '10月3日'],

					//默认不选中
					selectedGroupSizeIndex: -1, // 0:6-9人, 1:10-12人, 2:12-15人
					selectedOriginPlaceIndex: -1, // hz:杭州, sh:上海, nj:南京
					selectedLeavedDateIndex: -1, //1001, 1002, 1003
					canSelect: true,
					leaveDays: 3
				},
				personInfo: {
					adult : {
						count: 2,
						main: {
							name: '',
							id: '',
							phone: ''
						},// 默认给２个人
						extra: [{
							name: '',
							id: ''
						}]
					},
					kid: {
						count: 0
					}
				},
				services : {
					guide: true,
					car: false,
					plain: true,
					ensurance: true
				},
				price: {
					adult: 899.00,
					kid: 270.00,
					payPrice: 0
				}
			},
            isGroup: Util.isGroup(),
            isFirst: true, // 第一次加载的标志位
			enter: false,
			isJoined: false,
			maxAdultValue: 15,
			canSubmit: false,
			message: ''
		}
		this.state = this.props.data || defaults;
		
	}

	componentDidMount() {
		let that = this;
		if (!!this.props.data) {

		} else if (Util.isJoinedUser()) {
			// 如果是参团的用户，需要初始化选择状态，并且不能修改
			let getGroupInfoParam = {
				url: 'joingroup/query',
				method: 'get',
				data: {
					id: Util.fetchGroupId()
				},
				successFn :function(result) {
					if (Util.isResultSuccessful(result)) {
						let json = result.data;

						let selectedGroupSizeIndex = selectedIndexMap['groupSize'][''+json.userMinAmount];
						let selectedOriginPlaceIndex = selectedIndexMap['travelAddress'][''+json.travelAddress];
						let selectedLeavedDateIndex = selectedIndexMap['travelTime'][''+json.travelTime];
						let info = that.state.info;
						let group = info.group;

						that.setState({
							isJoined: true,
							info: {
								group: {
									groupSizes: group.groupSizes, 
									originPlaces: group.originPlaces,
									leavedDates: group.leavedDates,

									//默认不选中
									selectedGroupSizeIndex: selectedGroupSizeIndex, // 0:6-9人, 1:10-12人, 2:12-15人
									selectedOriginPlaceIndex: selectedOriginPlaceIndex, // hz:杭州, sh:上海, nj:南京
									selectedLeavedDateIndex: selectedLeavedDateIndex, // 1001, 1002, 1003
									canSelect: false,
									leaveDays: 3
								},
								personInfo: info.personInfo,
								services: info.services,
								price: info.price
							},
							maxAdultValue: json['remainAmount']
						}, () => {
							let personInfo = that.refs['personInfo'];
							personInfo.refs['adultCounter'].updateMaxValue(json['remainAmount']);
							that.setState({
								isFirst: false
							}, ()=>{
								that.initInfo();
							});
						});
					}
				},
				errorFn : function () {
					console.error(arguments);
				}
			}
			Util.fetchData(getGroupInfoParam);
		}

		this.initInfo();
		this.initShare();
	}

	initInfo () {
		this.reCalculatePrice();
		this.validateForm();
	}

	initShare () {
		WeixinUtil.initWeixinJSBridge(function () {
			WeixinUtil.hideOptionMenu();
		});
	}

	validateForm () {
		let {group, personInfo} = this.state.info;
		let infoValidator = new InfoValidator({
			group: group,
			personInfo: personInfo
		});	

		return infoValidator.validate();
	}

	handleMemberAmountChange (state) {
		// 1. fixed person numberCount

		let info = this.state.info;
		let that = this;
		this.setState({
			info : {
				group: info.group,
				personInfo : state,
				services: info.services,
				price: info.price
			}
		}, () => {
			console.log('handleMemberAmountChange', state)
			this.refs['personInfo'].updateExtraList(state);
			// 2. recal price
			that.reCalculatePrice();
			that.validateAndResetSumbitButton();
		});
		
	}

	handleServiceChange (state) {
		let info = this.state.info;
		let that = this;
		this.setState({
			info : {
				group: info.group,
				personInfo : info.personInfo,
				services: state,
				price: info.price
			}
		}, () => {
			that.reCalculatePrice();
			that.validateAndResetSumbitButton();
		});
	}

	/**
	 * [reCalculatePrice 组件更新后报表重计算]
	 * @Author   JohnNong
	 * @Email    overkazaf@gmail.com
	 * @Github   https://github.com/overkazaf
	 * @DateTime 2016-09-12T10:39:16+0800
	 * @return   {[type]}                     [description]
	 */
	reCalculatePrice () {
		let info = this.state.info;
		let personInfo = info.personInfo;
		let group = info.group;
		let isInside69Group = function () { return group.selectedGroupSizeIndex == 0;}; // 6-9人的团，拼团价*1.1
		let price = info.price;
		let overflowRate = 1.10;

		// 修正单独购买的价格
		let 
			singleRoomPrice1 = 850,
			singleRoomPrice2 = 2800,
			groupRoomPrice1 = (350 - 24), // 修正房价，减去24块，使最终房价能达到998
			groupRoomPrice2 = 1410,
			singleTicketPrice = 110 + 100 + 160,
			groupTicketPrice = 50 + 0 + 80,
			kidPrice = 270.00,
			kidCount = personInfo.kid.count,
			adultCount = personInfo.adult.count,
			room = Math.ceil(adultCount/2);

		if (isInside69Group()) {
			groupRoomPrice1 *= overflowRate;
			groupRoomPrice2 *= overflowRate;
			groupTicketPrice *= overflowRate;
		}	

		let singleAdultAveragePrice = (singleRoomPrice1 + singleRoomPrice2) * (room / adultCount) + singleTicketPrice;
			singleAdultAveragePrice = new Number(singleAdultAveragePrice).toFixed(2);

		let singleAdultOrderPrice = (singleRoomPrice1 + singleRoomPrice2) * room + adultCount * singleTicketPrice + kidCount * kidPrice;
			singleAdultOrderPrice = new Number(singleAdultOrderPrice).toFixed(2);

		let groupAdultAveragePrice = (groupRoomPrice1 + groupRoomPrice2) * (room / adultCount) + groupTicketPrice;
			groupAdultAveragePrice = new Number(groupAdultAveragePrice).toFixed(2);

		let groupAdultOrderPrice = (groupRoomPrice1 + groupRoomPrice2) * room + adultCount * groupTicketPrice + kidCount * kidPrice;
			groupAdultOrderPrice = new Number(groupAdultOrderPrice).toFixed(2);

		if (Util.isGroup()) {
			this.setState({
				info : {
					group: info.group,
					personInfo: info.personInfo,
					services: info.services,
					price : {
						adult: groupAdultAveragePrice,
						kid: new Number(kidPrice).toFixed(2),
						payPrice: groupAdultOrderPrice
					}
				}
			},  () => {
				console.log('group recalc price successfully');
			});
		} else {
			if (Util.isSingleBuy() && personInfo.adult.extra.length > 9) {
				// 如果单独购买超过了10人，按拼团价算
				singleAdultAveragePrice = groupAdultAveragePrice;
				singleAdultOrderPrice = groupAdultOrderPrice;
			}	

			this.setState({
				info : {
					group: info.group,
					personInfo: info.personInfo,
					services: info.services,
					price : {
						adult: singleAdultAveragePrice,
						kid: new Number(kidPrice).toFixed(2),
						payPrice: singleAdultOrderPrice
					}
				}
			},  () => {
				console.log('single recalc price successfully');
			});
		}
	}

	/**
	 * [buildForm 参数通过前端校验后，构建向后台提交的数据实体]
	 * @Author   JohnNong
	 * @Email    overkazaf@gmail.com
	 * @Github   https://github.com/overkazaf
	 * @DateTime 2016-09-12T10:39:28+0800
	 * @return   {[type]}                     [description]
	 */
	buildFormEntity () {
         /*id|该拼团的id|否|null
            userAmount|该拼团的人数|否|无 eg:6-9
            userId|该用户的id|是|无
            travelAddress|旅游出发城市|否|无
            travelTime|旅游时间|否|无
            userNum|用户出行人数|是|无
            normalNum|成人人数|否|无
            specialNum|儿童人数|否|无
            type|类型{拼团购买，还是个人购买}|是|无
            userDetail|用户信息详情|是|[{username:llm,cardNo:32324120032988},{username:llm,cardNo:32324120032988}]
            phone|联系电话|是|无
            guideService|全程导游服务|否|否
            carService|用车服务|否|否
            meetAirport|接机服务|否|否
            secure|保险|否|否
            payPrice|付款金额|是|无*/
        
         let userAmountArray = ['6-9', '10-12', '12-15'];
         let leavedDatesArray = ['2016-10-01', '2016-10-02', '2016-10-03']
         
         let that = this,
             info = that.state.info,
             group = info.group,
             personInfo = info.personInfo,
             services = info.services,
             adult = personInfo.adult,
             kid = personInfo.kid;
         
         let userId = Util.getCurrentUserId(); //Util.getCurrentUserId();
         let type = this.state.isGroup ? 1 : 2; // 1拼团  /  2个人购买
         
         let userAmount = userAmountArray[group.selectedGroupSizeIndex];
         let travelAddress = group.originPlaces[group.selectedOriginPlaceIndex];
         let travelTime = leavedDatesArray[group.selectedLeavedDateIndex];
         
         let userNum = adult.count + kid.count;
         let normalNum = adult.count;
         let specialNum = kid.count;
         
         let userDetail = adult.extra.map(function(item, index){
                return {
                    username: item.name,
                    cardNo: item.id
                };
         });
         
         userDetail.unshift({
                name: adult.main.name,
                cardNo: adult.main.id
         });
         let phone = adult.main.phone;
         
         // 服务费用
         let guideService = services.guide,
             carService = services.car,
             meetAirport = services.plain,
             secure = services.ensurance;
         
         // 总价格
         let payPrice = that.calcTotalPrice(that.state);
         
         // 从分享出去的页面点击过来的groupId
         let sharedGroupId = Util.fetchGroupId();
         
         return {
           id: +sharedGroupId,
           userAmount: userAmount,
           userId: +userId,
           travelAddress: travelAddress,
           travelTime: travelTime,
           userNum: userNum,
           normalNum: normalNum,
           specialNum: specialNum,
           type: type,
           userDetail: userDetail,
           phone: phone,
           guideService: guideService,
           carSevice: carService,
           meetAirport: meetAirport,
           secure: secure,
           payPrice: payPrice
         };
	}
    
    calcTotalPrice (state) {
        // 根据当前的状态计算总价格
        let price = this.state.info.price;
        return price.payPrice;
        return 0.1;
    }

	handleToPay () {
		let that = this;
		let validResult = this.validateForm();
		if (!validResult.success) {
			let errorMessage = '信息填写错误，请检查';
			this.setState({
				enter: true,
				canSubmit: false,
				message: validResult.message
			}, () => {
				setTimeout(function () {
					this.setState({
						enter: false
					});
				}.bind(this), 3000);
			});
		} else {

			this.setState({
				canSubmit: true
			});
			this.reCalculatePrice();
        	
        	// 构造向后台提交的数据结构
			let json = this.buildFormEntity();
			// console.log('buildFormEntity', json);
	        let param = {
	                url : 'joingroup/add',
	                method : 'POST',
	                data : json,
	                successFn : function (result){
	                    // console.log('success in handleToPay', result);
	                    if (result.success) {
	                    	Util.leavePage(function () {
	                    		let payHref = 'http://yougo.xinguang.com/fightgroup-web/public/build/wxPages/Pay/index.html?detailId='+result.data;
	                    		if (Util.isGroup()) {
	                    			payHref += '&isGroup=true';
	                    		}
	                    		location.href = payHref;
	                    	});   
	                    } else {
	                        let errorMessage = '' + result.errorMSG;
	                        that.setState({
	                        	message: errorMessage,
	                        	canSubmit: false,
	                        	enter: true
	                        }, () => {
	                        	setTimeout(function (){
	                        		that.setState({
	                        			enter: false
	                        		})
	                        	}, 3000);
	                        });
	                    }
	                },
	                errorFn : function () {
	                    console.error(arguments);
	                }
	         };
	        
	        Util.fetchData(param);
		}
	}

	/**
	 * [enter 负责通知组件的显示]
	 * @Author   JohnNong
	 * @Email    overkazaf@gmail.com
	 * @Github   https://github.com/overkazaf
	 * @DateTime 2016-09-09T11:20:51+0800
	 * @return   {[type]}                     [description]
	 */
	enter () {
		this.setState({
			enter: true
		})
	}

	leave() {
		this.setState({
		  enter: false
		});
	}

    handleGroupStateChange (groupState) {
    	
    	let that = this;
        let info = this.state.info;
        let maxAmount = Util.isJoinedUser() ? this.state.maxAdultValue : adultMaxValueLimitArray[groupState['selectedGroupSizeIndex']];
        // console.log('groupState', adultMaxValueLimitArray[groupState['selectedGroupSizeIndex']]);
		this.setState({
			info : {
				personInfo: info.personInfo,
                group: groupState,
				services: info.services,
				price: info.price
			},
			maxAdultValue: maxAmount
		}, () => {
			//console.log('this.refs.personInfo', this.refs.personInfo);
			//console.log('new state after setting state in handleGroupStateChange', this.state);
			that.reCalculatePrice();
			that.validateAndResetSumbitButton();
		});
   }

	validateAndResetSumbitButton () {
		let that = this;
		let validResult = that.validateForm();
			//console.log('validResult', validResult);
			if (validResult.success == true) {
				that.setState({
					canSubmit: true
				});
			} else {
				//console.log('!canSubmit');
				that.setState({
					canSubmit: false
				}, ()=>{
				//console.log('!canSubmit', that.state);
				let personInfo = that.refs['personInfo'];
				//console.log(personInfo.refs['adultCounter']);
				//console.log(personInfo.refs['adultCounter'].props);

				personInfo.refs['adultCounter'].updateMaxValue(that.state.maxAdultValue);
			});
		}
	}

	handleMainInfoChange (state) {
		let info = this.state.info;
		let personInfo = info.personInfo;
		let that = this;
		this.setState({
			info : {
				personInfo: state,
                group: info.group,
				services: info.services,
				price: info.price
			}
		}, () => {
			//console.log('new state after setting state in handleMainInfoChange', this.state);
			that.noticeExtraListUpdated(personInfo.adult.extra);
			that.validateAndResetSumbitButton();
		});
	}

	showErrorMessage () {
		let validResult = this.validateForm();
		let that = this;
		if (!validResult.success) {
			this.setState({
				enter: true,
				message: validResult.message
			}, () => {
				setTimeout(()=>{
					that.setState({
						enter: false
					})
				}, 3000);
			});
		}
	}

	noticeExtraListUpdated (list) {
		let info = this.state.info;
		let personInfo = info.personInfo;
		let that = this;
		this.setState({
			info: {
				group: info.group,
				personInfo: {
					adult : {
						count: personInfo.adult.count,
						main: personInfo.adult.main,
						extra: list
					},
					kid: personInfo.kid
				},
				services: info.services,
				price: info.price
			}
		}, ()=> {
			// that.refs['personInfo'].resetExtraInfoList(list);
		});
	}

	render () {
		let that = this;

		let priceInfo = this.state.info.price;

		let personInfo = this.state.info.personInfo;

		let reCalculatePrice = function () {
			that.reCalculatePrice();
		};

		let handleToPay = function () {
			that.handleToPay();
		};

		let handleMemberAmountChange = function (state) {
			that.handleMemberAmountChange(state);
		};

		let handleGroupStateChange = function (state) {
             that.handleGroupStateChange(state);
		};


		let handleMainInfoChange = function (state) {
			that.handleMainInfoChange(state);
		};

		let noticeExtraListUpdated = function (list) {
			that.noticeExtraListUpdated(list);
		};
		let handleServiceChange = function (state) {
			that.handleServiceChange(state);
		};

		let showErrorMessage = () => {
			that.showErrorMessage();
		}
    
        let isGroup = !!this.state.isGroup;
        let maxAdultValue = this.state.maxAdultValue;
        let canSelect = !this.state.isJoined;
        let canSubmit = this.state.canSubmit;
        let defaultAdultValue = personInfo.adult.count;

        // console.log('personInfo', personInfo);

		return (
			<div className="m-fill-form">
				<section className="info-item">
					<GroupInfo 
						canSelect={canSelect}
                        isGroup={isGroup}
						info={this.state.info.group}
						handleGroupStateChange={handleGroupStateChange}/>
					<PersonInfo
					   ref="personInfo"
					   maxAdultValue={maxAdultValue}
					   defaultAdultValue={defaultAdultValue}
					   noticeExtraListUpdated={noticeExtraListUpdated}
                       isGroup={isGroup}
					 personInfo={personInfo}
					 handleMainInfoChange={handleMainInfoChange}
					 handleMemberAmountChange={handleMemberAmountChange}/>
				</section>
				
				<section className="info-item">
					<FeeList />
				</section>
				
				<section className="info-item">
					<DistServices 
					info={this.state.info.services} 
					handleServiceChange={handleServiceChange} 
					/>
				</section>

				<ReadyPayInfo 
					price={priceInfo} 
					canSubmit={canSubmit} 
					showErrorMessage={showErrorMessage}
					handleNextStep={handleToPay}/>

				<Notification enter={this.state.enter} leave={this.leave.bind(this)}>{this.state.message}</Notification>
				
			</div>
		)
	}

}