const log = function () {
	console.log.apply(this, [].slice.call(arguments));
};

const err = function () {
	console.error.apply(this, [].slice.call(arguments));
};

const info = function () {
	console.info.apply(this, [].slice.call(arguments));
};

const printUsage = function () {
	log('USAGE:');
	log('\tnode app.js -d xxx -p yyy -n zzz');
	log('PARAMETER DETAILS:');
	log('\t-d | --dir: project directory');
	log('\t-l | --libs: indicates all the project dependencise');
	log('\t-p | --pages: indicates how many pages are included by this project');
	log('\t-n | --name: project\'s name');
	log('\t-t | --type: chart\'s type');
	log('\t-h | --help: help infomation');
};

// 命令参数的类型
const 
	CMD = {
		'DIR' : 1, // 目标目录,
		'CHART_TYPE' : 2, // 可视化项目类型 d3|echarts|highcharts
		'CHART_DEPENDENCIES' : 3, // 项目依赖
		'PAGES' : 4, // 页面个数
		'PROJECT_NAME' : 5, // 页面名称
		'LIB' : 6, // 依赖名称
		'HELP' : 10 // 帮助
	};

const 
	commands = {
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
		'-l' : CMD.LIB,
		'--libs' : CMD.LIB,
		'-h' : CMD.HELP,
		'--help' : CMD.HELP
	};

const 
	argsMap = {
		'--dir':'d',
		'-d':'d',
		'--name':'n',
		'-n':'n',
		'--type':'t',
		'-t':'t',
		'--lib':'l',
		'-l':'l',
		'--pages':'p',
		'-p':'p',
	};

const parseParams = function (args) {
	const 
		p = {
			'd' : './',
			'n' : 'new_chart_project',
			't' : 'echarts',
			'l' : 'jquery echarts zrender',
			'p' : 3
		};
	

	const isValidCommand = function (param) {
		return Object.keys(commands).indexOf(param) !== -1;
	};

	var errorFlag = false;
	for (var i = args.length - 1; i >= 0; i--) {
		if (args[i] == '-h' || args[i] == '--help') {
			printUsage();
			break;
		};

		if (isValidCommand(args[i])) {
			if ((i+1) < args.length && !isValidCommand(args[i+1])) {
				if (args[i] == '-l' || args[i] == '--lib') {
					var lib = [],
						t = i+1;
					while (t < args.length && !isValidCommand(args[t])) {
						lib.push(args[t]);
						t++;
					}
					p[argsMap[args[i]]] = lib.join(' ');
				} else {
					p[argsMap[args[i]]] = args[i+1];
				}
			} else {
				errorFlag = true;
			}
		} else if (args[i].indexOf('-') >= 0) {
			errorFlag = true;
		}

		if (errorFlag) {
			printUsage();
			break;
		}
	}

	return errorFlag?null:p;
};

module.exports = {
	log : log,
	err : err,
	parseParams : parseParams
};