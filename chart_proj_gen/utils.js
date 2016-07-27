var log = function () {
	console.log.apply(this, [].slice.call(arguments));
};


var printUsage = function () {
	log('USAGE:');
	log('\tnode app.js -d xxx -p yyy -n zzz');
	log('PARAMETER DETAILS:');
	log('\t-d | --dir: project directory');
	log('\t-p | --pages: indicates how many pages are included by this project');
	log('\t-n | --name: project\'s name');
	log('\t-t | --type: chart\'s type');
	log('\t-h | --help: help infomation');
};

// 命令参数的类型
var CMD = {
	'DIR' : 1, // 目标目录,
	'CHART_TYPE' : 2, // 可视化项目类型 d3|echarts|highcharts
	'CHART_DEPENDENCIES' : 3, // 项目依赖
	'PAGES' : 4, // 页面个数
	'PROJECT_NAME' : 5, // 页面名称
	'HELP' : 10 // 帮助
};

var commands = {
	'-d' : CMD.DIR,
	'--dir' : CMD.DIR,
	'-t' : CMD.CHART_TYPE,
	'--type' : CMD.CHART_TYPE,
	'-dep' : CMD.CHART_DEPENDENCIES,
	'--dependencies' : CMD.CHART_DEPENDENCIES,
	'-p' : CMD.PAGES,
	'--pages' : CMD.PAGES,
	'-n' : CMD.PROJECT_NAME,
	'--name' : CMD.PROJECT_NAME,
	'-h' : CMD.HELP,
	'--help' : CMD.HELP
};

var argsMap = {
	'--dir':'d',
	'-d':'d',
	'--name':'n',
	'-n':'n',
	'--type':'t',
	'-t':'t',
	'--pages':'p',
	'-p':'p',
};

var parseParams = function (args) {
	var p = {
		'd' : './',
		'n' : 'new_chart_project',
		't' : 'echarts',
		'p' : 1,
	};
	

	var isValidCommand = function (param) {
		return Object.keys(commands).indexOf(param) !== -1;
	};


	for (var i = args.length - 1; i >= 0; i--) {
		var errorFlag = false;
		if (isValidCommand(args[i])) {
			if ((i+1) < args.length && !isValidCommand(args[i+1])) {
				p[argsMap[args[i]]] = args[i+1];
			} else {
				errorFlag = true;
			}
		} else if (args[i].indexOf('-' >= 0)) {
			errorFlag = true;
		}

		if (errorFlag) {
			printUsage();
			break;
		}
	}

	return p;
};

module.exports = {
	log : log,
	parseParams : parseParams
};