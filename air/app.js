$(function (){
	var OptionGroup = {
		"pie" : function () {
			var option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        data:['二氧化硫','二氧化氮','氮氧化物','二氧化硫','一氧化氮']
			    },
			    series: [
			        {
			            name:'空气质量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:0.335, name:'二氧化硫'},
			                {value:0.310, name:'二氧化氮'},
			                {value:0.234, name:'氮氧化物'},
			                {value:0.135, name:'二氧化硫'},
			                {value:0.1548, name:'一氧化氮'}
			            ]
			        }
			    ]
			};

				return option;
		},
		"bar" : function () {
			var option = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    legend: {
			        data:['二氧化硫','二氧化氮','氮氧化物','二氧化硫','一氧化氮']
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'二氧化硫',
			            type:'bar',
			            data:[0.320, 0.332, 0.301, 0.334, 0.390, 0.330,0.320, 0.332, 0.301, 0.334, 0.390, 0.330,0.320, 0.332, 0.301, 0.334, 0.390, 0.330,0.320, 0.332, 0.301, 0.334, 0.390, 0.330]
			        },
			        {
			            name:'二氧化氮',
			            type:'bar',
			            stack: '广告',
			            data:[0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.120, 0.132, 0.101, 0.134, 0.90, 0.230]
			        },
			        {
			            name:'氮氧化物',
			            type:'bar',
			            stack: '广告',
			            data:[0.220, 0.182, 0.191, 0.234, 0.290, 0.330,0.220, 0.182, 0.191, 0.234, 0.290, 0.330,0.220, 0.182, 0.191, 0.234, 0.290, 0.330,0.220, 0.182, 0.191, 0.234, 0.290, 0.330]
			        },
			        {
			            name:'二氧化硫',
			            type:'bar',
			            stack: '广告',
			            data:[0.150, 0.232, 0.201, 0.154, 0.190, 0.330,0.150, 0.232, 0.201, 0.154, 0.190, 0.330,0.150, 0.232, 0.201, 0.154, 0.190, 0.330,0.150, 0.232, 0.201, 0.154, 0.190, 0.330]
			        },
			        {
			            name:'一氧化氮',
			            type:'bar',
			            data:[0.862, 0.1018, 0.964, 0.1026, 0.1679, 0.1600,0.862, 0.1018, 0.964, 0.1026, 0.1679, 0.1600,0.862, 0.1018, 0.964, 0.1026, 0.1679, 0.1600,0.862, 0.1018, 0.964, 0.1026, 0.1679, 0.1600],
			            markLine : {
			                lineStyle: {
			                    normal: {
			                        type: 'dashed'
			                    }
			                },
			                data : [
			                    [{type : 'min'}, {type : 'max'}]
			                ]
			            }
			        }
			    ]
			};

			return option;
		}
	};


	var APP = {
		TITLE : "山东省空气质量检测数据",// 图表标题
		SUB_TITLE : "", // 图表副标题
		NAV : "#navContainer", // 导航id
		CANVAS_ID : "main", // 画图id
		COORDS_FILE : "coords-info-parsed.csv", // 坐标文件
		chartEl : null, // echarts 实例
		COORDS : null, // 坐标缓存
		LIMIT : 50000, // 这个是数据源的限制，改成一个很大的值就相当于处理所有文件的数据，不建议这样做，页面会卡顿
		NAV_LIST_FILE:"file_list.json",// 左侧导航的文件列表json文件
		info : "#lastInfo", // 显示数据点详细信息的div id
		cache : {}, //缓存对象
		init: function (){
			// 初始化缓存对象
			util.setCache('R', {});

			// 初始化坐标点信息
			this.initCoords();

			// 初始化地图，将坐标点绘制上去
			this.initMap();

			// 构建导航（展示左侧的数据文件列表）
			this.buildNavs();
		},
		initCoords : function () {
			getFile(APP.COORDS_FILE, function (coordsCSV){
				// 这块主要是将坐标点的csv文件取到后，解析成json格式，并缓存下来，供后续程序处理使用
				var lines = coordsCSV.split('\n');
				var header = lines.shift();
				var columns = header.split(',');
				var result = {};
				for (var i = 0, l = lines.length; i<l; i++) {
					var line = lines[i].split(',');
					for (var j = 0, ll = line.length; j<ll; j++) {
						//var colName = $.trim(columns[j]);
						var colVal = $.trim(line[j]);
						
						if (j == 2) {
							// 为新地点开辟经纬度数组
							if (! (colVal in result)) {
								result[colVal] = []
							}
						} else if (j == 3 || j == 4) {
							// 存入经纬度
							result[$.trim(line[2])].push(parseFloat(colVal));
						}
					}
				}

				APP.COORDS = result;
			});
		},
		getCurrentFilePath : function () {
			// 获取当前选中的文件路径
			var path = $(APP.NAV).find('li.active').attr('data-source');
			return path;
		},
		initMap : function (){
			var dom = $('#' + APP.CANVAS_ID)[0];
    		var chart = APP.chartEl = echarts.init(dom, 'shine');

    		// 初始化图表，需要先取到山东市的地图
    		getFile('node_modules/echarts/map/json/province/shandong.json', function(chinaJson) {
    			// 注册山东市的地图
                echarts.registerMap('shandong', chinaJson);
                
                // 初始化时， 只需要将坐标文件里相应的坐标点绘制上去，当用户重新选择数据源后， 再进行图表的重绘
                var option = {
                    backgroundColor: '#404a59',
                    title: {
                        text: APP.TITLE,
                        subtext: APP.SUB_TITLE,
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        position: function (point, params, dom) {
                          // 提示信息固定在鼠标附近
                          return [point[0], point[1]];
                      }
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'bottom',
                        x: 'right',
                        data: ['区域坐标'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'shandong',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: [{
                        name: '坐标点',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: getDefaultCoordData(),
                        symbolSize: 15,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#a6c84c',
                                shadowBlur: 1,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }]
                };

                // 根据配置项渲染图表
                chart.setOption(option);
            });
		},
		buildNavs : function () {
			var that = this;
			// 构建左侧的导航，先要取到file_list.json文件
			getFile(APP.NAV_LIST_FILE, function (files){
				var fileList = JSON.parse(files);
				var $ul = $(APP.NAV);
				var tpl = '';
				fileList.forEach(function (item){
					var liTpl = dropdownTpl();
					var re = new RegExp("{{TEXT}}", "g")
					liTpl = liTpl.replace(re, item);
					liTpl = liTpl.replace('{{SOURCE}}', item.split('-')[1] + '~' + item.split('-')[2].split('.')[0])
					tpl += liTpl;
				});
				$ul.html(tpl);

				// 为导航绑定点击事件，点击后根据数据文件重绘地图
				$ul.on('click', 'li', function (){
					$(this).addClass('active').siblings().removeClass('active');
					that.buildMap();
				});
			});
		},
		buildSubCharts : function () {
			var $info = $(APP.info);
			var siteName = $info.find('.siteName').first().text();
			var detail = $info.find('.detail').first().text();
			var sum = $info.find('.sum').first().text();
			console.log('siteName', siteName);
			console.log('detail', detail);
			console.log('sum', sum);

			var $pie = echarts.init($('#pie')[0]);
			var pieOption = OptionGroup["pie"]();
			$pie.setOption(pieOption);

			var $bar = echarts.init($('#bar')[0]);
			var barOption = OptionGroup['bar']();
			$bar.setOption(barOption);
		},
		buildMap : function (callback) {
			// 提示用户正在处理数据，禁止用户的操作
			APP.Waiting['show']("数据处理中,请耐心等待...");

			// 当前选中的数据源文件
			var file = this.getCurrentFilePath();
			
			// 向后台取数据文件
			getFile(file, function (file){

				// 如果有缓存， 取缓存里的配置项
				var option = util.getCache('Option_' + file);
				if (!option) {
					// 没有缓存配置项， 则构建并缓存下来
					var R = util.getCache('R');
					// csv转化成json格式
					var jsonArray = csv2json(file);

					// 转化成AirVO实体对象， 每个对象携带了相应的日期信息
					var voList = buildVOList(jsonArray);
					
					// 缓存局部数据信息， 下一次直接取缓存就行了
					R[file] = hashVOList(voList);

					// 根据数据生成图表的配置项
					option = generateDataByFile(file);
					util.setCache('Option_' + file, option);
				}

				APP.Waiting['hide']();
				setTimeout(function (){
					// 重绘图表
					APP.chartEl.setOption(option);

					callback && callback();
				}, 500)
			});
		},
		Waiting : {
			show : function (text){
				$('#mask').html(text).css({
					'position':'absolute',
					'left' : 0,
					'top':0,
					'backgroundColor' : 'rgba(0,0,0,0.5)',
					'zIndex' : 1004,
					'fontSize' : 120,
					'textShadow' : '0 0 10px #999',
					'color' : '#fff',
					'textAlign' : 'center',
					'lineHeight' : $(window).height() + 'px',
					'width' : $(window).width() + 'px',
					'height' : $(window).height() + 'px'
				});
				$('#mask').fadeIn(1000)
			},
			hide : function () {
				$('#mask').css({
					'zIndex' : -1
				}).html('').fadeOut('slow');
			}
		}
	};

    


	function buildVOList (list) {
		var voList = [];
		list.forEach(function(item){
			// 站点名称,项目名称,时间,小时均值
			var vo = new AirVO({
				siteName : item['站点名称'],
				projName : item['项目名称'],
				dateTime : item['时间'],
				average : item['小时均值'],
				coords : APP.COORDS[item['站点名称']]
			});
			voList.push(vo);
		});
		return voList;
	}

	function hashVOList (voList) {
		// 根据24小时放置vo对象
		var hashObj = {};
		voList.forEach(function (voItem){
			var day = voItem.getDateTime().day;
			if (!hashObj[day]) {
				hashObj[day] = [];
			}
			hashObj[day].push(voItem);
		});

		return hashObj;
	}

	/**
	 * [csv2json 把csv文件转换为json文件 ]
	 * @param  {[type]} csv [要解析的csv文件字符串]
	 * @return {[type]}     [description]
	 */
	function csv2json (csv) {
		var lines = csv.split('\n');
		var header = lines.shift();
		var columns = header.split(',');
		var result = [];

		lines.forEach(function (lineItem, index) {
			// 这里为了演示时不用等待过长的时间， 在APP.LIMIT变量里指定了最大读取的csv文件数据行数
			if (index > APP.LIMIT) return;
			
			var lineCols = lineItem.split(',');
			
			// 站点名称,项目名称,时间,小时均值
			var newObj = {};

			lineCols.forEach(function (colItem, jIndex){
				newObj[columns[jIndex]] = lineCols[jIndex];
			});
			result.push(newObj);
		});

		return result;
	}

	/**
	 * 每一个导航的结构
	 * @return {[type]} [description]
	 */
	function dropdownTpl () {
		return "<li role=\"presentation\" data-source=\"parsed/{{TEXT}}\"><a href=\"#\">{{SOURCE}}</a></li>";
	}


	/**
	 * [getFile 获取文件的通用函数]
	 * @param  {[type]}   fileName [文件名]
	 * @param  {Function} callback [取得文件内容后的回调函数]
	 * @return {[type]}            [description]
	 */
	function getFile (fileName, callback) {
		if (APP.cache[fileName]) {
			// 如果已经读取过， 直接取缓存数据
			return callback(APP.cache[fileName]);
		} else {
			$.ajax({
				url : "http://localhost:8082/" + fileName,
				type : "GET",
				dataType : 'text',
				success : function (text){
					APP.cache[fileName] = text;

					callback && callback(text);
				},
				error : function (){
					console.error(arguments);
				}
			});
		}
	}

	/**
	 * [getDefaultCoordData 获取坐标点信息]
	 * @return {[type]} [description]
	 */
	function getDefaultCoordData () {
		var coordsInfo = APP.COORDS;
		var data = [];
		for (var name in coordsInfo) {
			data.push({
				name : name,
				value : coordsInfo[name]
			});
		}
		return data;
	}


	/**
	 * [getAirData 根据给定的日期，获取相应的日期数据]
	 * @param  {[type]} fileName [文件名]
	 * @param  {[type]} day      [description]
	 * @return {[type]}          [description]
	 */
	function getAirData (fileName, day) {
		var R = util.getCache('R');
		var file = R[fileName] || {};
		var dataList = file[day] || [];
		var result = [];

		dataList.forEach(function (voItem) {
			result.push({
				siteName : voItem.siteName,
				projName : voItem.projName,
				dateTime : voItem.dateTime,
				average : voItem.average,
				coords : voItem.coords
			});
		});

		return result;
	}

	/**
	 * [convertData 转换数据]
	 * @param  {[type]} data     [description]
	 * @param  {[type]} fileName [description]
	 * @return {[type]}          [description]
	 */
	var convertData = function(data, fileName) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
        	(function (i){
        		var item = data[i];
	        	res.push([{
                    coord: item.coords,
                    tooltip: { // 让鼠标悬浮到此项时能够显示 `tooltip`。
                        formatter: function(params) {
                        	var R = util.getCache('R');
                        	var data = R[fileName];

                            var ret = [];
                            var simple = [];
                            
                            var Index = new Date(item.dateTime).getDate();
                            var dataList = data[Index];

                            simple.push('时间：' + item.dateTime.split(' ')[0]);
                            simple.push('站点名称:    ' + item.siteName);
                            simple.push('所含项目：');

                            ret.push('时间：' + item.dateTime.split(' ')[0]);
                            ret.push('<h3>站点名称:    <span class="siteName">' + item.siteName + '</span></h3>');
                            ret.push('小时均值（00:00 - 23:00）:');
                            
                            var tpl = "";
                            var lastProj = "";
                            for (var i = 0, l = dataList.length; i < l; i++) {
                            	var dataItem = dataList[i];
                            	if (dataItem.projName != lastProj) {
                            		lastProj = dataItem.projName;
                            		ret.push('项目名称:    ' + "<span class='projName'>"+ dataItem.projName +"</span>");

                            		simple.push(dataItem.projName);
                            	}
                            	
                            	var line = new Number(dataItem.average).toFixed(6);

                            	tpl = tpl + line + ",";

                            	if ((i + 1) % 24 == 0) {
                            		var sumArray = tpl.split(',');
                            		ret.push("<span class='detail'>" + tpl.substring(0, tpl.length - 1)+"</span>");
                            		tpl = "";
                            		var sum = 0,cnt = 0;

                            		sumArray.pop();
                            		sumArray.forEach(function (v){
                            			if (!isNaN(v)) {
                            				sum += parseFloat(v);
                            				cnt++;
                            			}
                            		});

                            		ret.push("<span class='sum'>"+ sum +"</span");

                            		ret.push('当日均值：' + (cnt > 0 ? sum/cnt:sum));
                            		ret.push('<br />');

                            	}
                            }

                            if (!dataList.length) {
                            	ret.push('暂无信息');
                            }

                            if ($(APP.info).attr('currentItem') != item.siteName) {

                            	$(APP.info).html(ret.join('<br />'));

                            	$(APP.info).attr('currentItem', item.siteName);



                            	APP.buildSubCharts();
                            }
                            
                            return simple.join('<br />');
                        }
                    }
                }, {
                	coord: item.coords
                }]);
        	})(i);
        }
        return res;
    };

    /**
     * [generateDataByFile 根据数据源文件生成图表需要的数据]
     * @param  {[type]} fileName [数据文件名]
     * @return {[type]}          [description]
     */
	function generateDataByFile(fileName) {
		// 获取日期， 即时间轴上的31天
        var timeLineData = getTimelineData();
        var options = [];

        timeLineData.forEach(function(item, index) {
            var data = getAirData(fileName, index+1);
            var color = ['#a6c84c', '#ffa022', '#46bee9'];
            var series = [];
            [
                ['山东', data]
            ].forEach(function(item, i) {
                series.push(
                // 第一项是坐标点， 比初始化的时间要小一些
                {
                    name: '坐标点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: getDefaultCoordData(),
                    symbolSize: 5,
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#a6c84c',
                            shadowBlur: 2,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }, 
                {
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: "circle",
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    }
                },
                // 这一项将目标点颜色指定为#ffff00，即黄色，并且鼠标悬浮后展示了摘要信息，并且在下方更新数据点的详细信息
                {
                    name: item[0],
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 20,
                        trailLength: 0,
                        symbol: 'circle',
                        symbolSize: 16
                    },
                    lineStyle: {
                        normal: {
                            color: "#ffff00",
                            width: 20,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1], fileName)
                });
            });

            var newItem = {
                title: {
                    text: APP.TITLE
                },
                series: series
            };

            options.push(newItem);
        });

        return getChartOption(options);
    };


    /**
     * [getChartOption 获取最终的图表配置项]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	function getChartOption(options) {
        // 生成对应的地图坐标点
        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var option = {
            backgroundColor: '#404a59',
            title: {
                text: APP.TITLE,
                subtext: '数据源：'+$(APP.NAV).find('li.active').text(),
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                position: function (point, params, dom) {
                      // 固定在顶部
                      return [point[0], point[1]];
                },
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['山东'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            geo: {
                map: 'shandong',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            timeline: {
                show: true,
                type: 'slider',
                axisType: 'category',
                symbol: 'circle',
                symbolSize: 10,
                realtime: false,
                playInterval: 3000,
                data: getTimelineData(), // 31Days
                label: {
                    normal: {
                        rotate: 0,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ffffff'
                    }
                },
                lineStyle: {
                    show: true,
                    color: '#0099ff'
                },
                controlStyle: {
                    normal: {
                        color: '#0099ff'
                    }
                },
                bottom: 15

            },
            series: [{
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbol: "circle",
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: color[0],
                            width: 0,
                            curveness: 0.2
                        }
                    }
                }, {
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: "circle",
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    }
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function(val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: color[1]
                        }
                    }
                }]
                //series
        };

        var targetOption = {
            baseOption: option,
            options: options
        };
        return targetOption;
    }

    /**
     * [getTimelineData 获取时间轴的数据，即1-31号]
     * @return {[type]} [description]
     */
    function getTimelineData() {
        var ret = [];

        for (var i = 1; i < 32; i++) {
            var time = i;
            ret.push(time);
        }
        return ret;
    }

    // 初始化应用程序
	APP.init();

	window.APP = APP;
});