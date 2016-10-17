import React, {Component} from 'react';
import BasicInfo from './BasicInfo';
import PersonInfo from './PersonInfo';
import FeeList from './FeeList';
import DistServices from './DistServices';
import ReadyPayInfo from './ReadyPayInfo';
import Notification from 'components/Notification/Notification';
import InfoValidator from 'extend/validator/InfoValidator';
import InfoAdaptor from 'extend/adaptor/InfoAdaptor';
import Util from 'extend/util';
import DateUtil from 'extend/DateUtil';
import WeixinUtil from 'extend/WeixinUtil';
import './InfoForm.scss';
import 'scss/base.scss';

export default class InfoForm extends Component {

	constructor (props) {
		super(props);
		let defaults = {
			entityData: {
				basicInfo: this.props.form,
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
				feeList: [
					{"label":"左口乡民宿3选1", "price":"门市价¥850/晚", "extra":""},
					{"label":"文渊狮城铂瑞酒店", "price":"门市价¥2800/晚", "extra":"五星"},
					{"label":"西南湖区（龙川湾）", "price":"门市价¥160/人", "extra":""},
					{"label":"九龙溪漂流", "price":"门市价¥110/人", "extra":""},
					{"label":"文渊狮城度假区", "price":"门市价¥100/人", "extra":""},
					{"label":"古街景点门票（3选1）", "price":"免费", "extra":""},
				],
				price: {
					adult: 899.00,
					kid: 270.00,
					payPrice: 0
				}
			}
		}
		this.state = {
			info: this.props.info || defaults,
			form: this.props.form || {},
			isGroup: Util.isGroup(),
            isFirstLoaded: true, // 第一次加载的标志位
			enter: false,
			isJoined: false,
			maxAdultValue: 15,
			canSubmit: false,
			message: ''
		};
	}

	componentDidMount() {
		let that = this;
		if (Util.isJoinedUser()) {
			// 如果是参团的用户，需要初始化选择状态，并且不能修改
			let getBasicInfoParam = {
				url: 'joingroup/query',
				method: 'get',
				data: {
					id: Util.fetchGroupId() || 290
				},
				successFn :function(result) {
					if (Util.isResultSuccessful(result)) {	
						let json = result.data;
						let info = that.state.info; 
						let entityData = info.entityData; 
						let {basicInfo, personInfo, services, price} = entityData;

						that.setState({
							isJoined: true,
							info: {
								entityData: {
									basicInfo: InfoAdaptor.buildJoinedBasicInfoFromHistorialData(json, basicInfo.form),
									personInfo: personInfo,
									services: services,
									price: price
								}
							},
							maxAdultValue: json['remainAmount']
						}, () => {
							let personInfoRef = that.refs['personInfo'];
							let adultCounterRef = personInfoRef.refs['adultCounter'];
							adultCounterRef.updateMaxValue(json['remainAmount']);

							that.setState({
								isFirstLoaded: false
							}, ()=>{
								//　这里可以做一些首次加载成功的功能
								that.initInfo();
							});
						});
					}
				},
				errorFn : function () {
					console.error.apply(null, [...arguments]);
				}
			}
			Util.fetchData(getBasicInfoParam);
		} else {	
			this.initInfo();
			this.initShare();
		}
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

		let {basicInfo, personInfo} = this.state.info.entityData;
		let infoValidator = new InfoValidator({
			basicInfo: basicInfo,
			personInfo: personInfo
		});	

		return infoValidator.validate();
	}

	handleMemberAmountChange (state) {
		// 1. fixed person numberCount

		let entityData = this.state.info.entityData;
		let that = this;
		this.setState({
			info : {
				entityData: {
					basicInfo: entityData.basicInfo,
					personInfo: state,
					services: entityData.services,
					price: entityData.price
				}
			}
		}, () => {
			that.reCalculatePrice();
			that.validateAndResetSumbitButton();
		});
		
	}

	/**
	 * [handleServiceChange 控制目的地服务改变的控制器，一期不做]
	 * @param  {[type]} state [description]
	 * @return {[type]}       [description]
	 */
	handleServiceChange (state) {
		let entityData = this.state.info.entityData;
		let that = this;
		this.setState({
			info: {
				entityData: {
					basicInfo: entityData.basicInfo,
					personInfo : entityData.personInfo,
					services: state,
					price: entityData.price
				}
				
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
		let entityData = this.state.info.entityData;
		let {basicInfo, personInfo} = entityData;
		let isInside69Group = function () { 
			// 6-9人的团，拼团价*1.1
			//return group.selectedGroupSizeIndex == 0;
			return false; // testing
		}; 
		let price = entityData.price;
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
				info: {
					entityData: {
						basicInfo: entityData.basicInfo,
						personInfo: entityData.personInfo,
						services: entityData.services,
						price : {
							adult: groupAdultAveragePrice,
							kid: new Number(kidPrice).toFixed(2),
							payPrice: groupAdultOrderPrice
						}
					}
				}
			});
		} else {
			if (Util.isSingleBuy() && personInfo.adult.extra.length > 9) {
				// 如果单独购买超过了10人，按拼团价算
				singleAdultAveragePrice = groupAdultAveragePrice;
				singleAdultOrderPrice = groupAdultOrderPrice;
			}	

			this.setState({
				info: {
					entityData: {
						basicInfo: entityData.basicInfo,
						personInfo: entityData.personInfo,
						services: entityData.services,
						price : {
							adult: singleAdultAveragePrice,
							kid: new Number(kidPrice).toFixed(2),
							payPrice: singleAdultOrderPrice
						}
					}
				}
			});
		}
	}

	priceCalc (personCount,singlePrice,roomPrice) {
		let isArray = function (obj) {
			if (typeof Array.isArray == 'function') return Array.isArray(obj);
			return obj instanceof Array || Object.prototype.toString.call(obj) == '[object Array]';
		}
		//如果房费是数组，则计算总房费
		let roomSum = 0;
		if (isArray(roomPrice)) {
			for (var i = 0, l = roomPrice.length; i<l; i++) {
				roomSum += roomPrice[i];
			}
		}else{
			roomSum = roomPrice;
		}

		let family = parseInt(personCount/3),		//家庭数
			halfRoomSum = (roomSum/2).toFixed(2);	//房差

		let priceSum = personCount*singlePrice - family*halfRoomSum;
		(personCount%3 == 1) && (priceSum += halfRoomSum);

		return new Number(priceSum).toFixed(2);
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
        let that = this;
        let entityData = that.state.info.entityData;
        let {basicInfo, personInfo, services} = entityData;         
        let {adult,kid} = personInfo;
		let userId = Util.getCurrentUserId(); //Util.getCurrentUserId();
		let type = this.state.isGroup ? 1 : 2; // 1拼团  /  2个人购买
		let formData = basicInfo.form;
		
		// 线路的可选参数，这个可以抽出去
		let userAmount = formData[0].currentValue;
		let travelAddress = formData[1].currentValue;
		let travelTime = formData[2].currentValue;

		// 服务费用
		let {guide, car, plain, ensurance} = services;
		// 总价格
		let payPrice = that.calcTotalPrice(that.state);
		// 从分享出去的页面点击过来的groupId
		let sharedGroupId = Util.fetchGroupId();

		// 构建人员信息的实体，单独抽出另外的方法进行实现
		let personInfoEntity = this.buildPersonInfoEntity(personInfo);

		return {
			id: +sharedGroupId,
			userId: +userId,
			userAmount: userAmount,
			travelAddress: travelAddress,
			travelTime: travelTime,
			type: type,
			userNum: personInfoEntity.userNum,
			normalNum: personInfoEntity.normalNum,
			specialNum: personInfoEntity.specialNum,
			userDetail: personInfoEntity.userDetail,
			phone: personInfoEntity.phone,
			guideService: guide,
			carSevice: car,
			meetAirport: plain,
			secure: ensurance,
			payPrice: payPrice
		};
	}

	/**
	 * [buildPersonInfoEntity 构建人员信息实体的方法]
	 * @param  {[type]} personInfo [description]
	 * @return {[type]}            [description]
	 */
	buildPersonInfoEntity (personInfo) {
		let {adult, kid} = personInfo; 
		// 修正用户信息的数据结构
		let userDetail = adult.extra.map(function(item, index){
		    return {
		        username: item.name,
		        cardNo: item.id
		    };
		});
		// 在人员队列中插入主要联系人的信息
		userDetail.unshift({
			name: adult.main.name,
			cardNo: adult.main.id
		});

		return {
			phone: adult.main.phone,
			userNum: adult.count + kid.count,
			normalNum: adult.count,
			specialNum: kid.count,
			userDetail: userDetail
		}
	}
    
    calcTotalPrice (state) {
        // 根据当前的状态计算总价格
        let price = this.state.info.entityData.price;
        return price.payPrice;
        return 0.1;
    }

    /**
     * [tryRecirecting2Pay 根据表单的校验结果尝试重定向到支付页面]
     * @param  {[type]} validResult [description]
     * @return {[type]}             [description]
     */
    tryRecirecting2Pay (validResult) {
    	let redirect2PayStrategy = {
    		'success': function (result) {
    			this.setState({
					canSubmit: true
				}, ()=>{
					this.reCalculatePrice();
		        	// 构造向后台提交的数据结构
					let json = this.buildFormEntity();
			        let param = {
			                url : 'joingroup/add',
			                method : 'POST',
			                data : json,
			                successFn : function (result){
			                    if (Util.isResultSuccessful(result.success)) {
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
				});
    		},
    		'fail': function (result) {
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
    		}
    	};

    	// 调用
    	redirect2PayStrategy[validResult.success?'success':'fail'].call(this, validResult);

    }

	handleNextStep () {
		this.tryRecirecting2Pay(this.validateForm());
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

    handleBasicInfoStateChange (basicInfo) {
    	let that = this;
        let entityData = this.state.info.entityData;
        //let maxAmount = Util.isJoinedUser() ? this.state.maxAdultValue : adultMaxValueLimitArray[groupState['selectedGroupSizeIndex']];
		this.setState({
			info: {
				entityData: {
					basicInfo: basicInfo,
					personInfo: entityData.personInfo,
					services: entityData.services,
					price: entityData.price
				}
			}
		}, () => {
			that.reCalculatePrice();
			that.validateAndResetSumbitButton();
		});
   }

	validateAndResetSumbitButton () {
		let that = this;
		let validResult = that.validateForm();
		if (validResult.success == true) {
			that.setState({
				canSubmit: true
			});
		} else {
			that.setState({
				canSubmit: false
			}, ()=>{
				let personInfo = that.refs['personInfo'];
				let adultCounter = personInfo.refs['adultCounter'];
				adultCounter.updateMaxValue(that.state.maxAdultValue);
			});
		}
	}

	handleMainInfoChange (state) {
		let entityData = this.state.info.entityData;
		let personInfo = entityData.personInfo;
		let that = this;
		this.setState({
			info : {
				entityData: {
					basicInfo: entityData.basicInfo,
					personInfo: state,
					services: entityData.services,
					price: entityData.price
				}
			}
		}, () => {
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

	render () {
		let priceSum = this.priceCalc(5,800,600);
		// console.log('priceSum', priceSum);

		let that = this;
		let currentState = this.state;
		let entityData = currentState.info.entityData;
		let {
			price,
			basicInfo,
			personInfo,
			services
		} = entityData;

		let reCalculatePrice = function () {
			that.reCalculatePrice();
		};

		let handleNextStep = function () {
			that.handleNextStep();
		};

		let handleMemberAmountChange = function (state) {
			that.handleMemberAmountChange(state);
		};

		let handleBasicInfoStateChange = function (state) {
             that.handleBasicInfoStateChange(state);
		};

		let handleMainInfoChange = function (state) {
			that.handleMainInfoChange(state);
		};

		let handleServiceChange = function (state) {
			that.handleServiceChange(state);
		};

		let showErrorMessage = () => {
			that.showErrorMessage();
		};
    
        let {maxAdultValue, isJoined, canSubmit, isGroup} = currentState;
        let canSelect = !isJoined;
        let defaultAdultValue = personInfo.adult.count;
        let feeList = currentState.info.entityData.feeList;

		return (
			<div className="m-fill-form">
				<section className="info-item">
					<BasicInfo 
						info={basicInfo}
						canSelect={canSelect}
                        isGroup={isGroup}
						handleBasicInfoStateChange={handleBasicInfoStateChange}/>
					<PersonInfo
					   ref="personInfo"
					   maxAdultValue={maxAdultValue}
					   defaultAdultValue={defaultAdultValue}
                       isGroup={isGroup}
					   personInfo={personInfo}
					   handleMainInfoChange={handleMainInfoChange}
					   handleMemberAmountChange={handleMemberAmountChange}/>
				</section>
				
				<section className="info-item">
					<FeeList info={feeList}/>
				</section>
				
				<section className="info-item">
					<DistServices 
					info={services} 
					handleServiceChange={handleServiceChange} 
					/>
				</section>

				<ReadyPayInfo 
					price={price} 
					canSubmit={canSubmit} 
					showErrorMessage={showErrorMessage}
					handleNextStep={handleNextStep}/>

				<Notification enter={this.state.enter} leave={this.leave.bind(this)}>{this.state.message}</Notification>	
			</div>
		)
	}

}