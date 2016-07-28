const 
	fs 	= require('fs'),
	cp 	= require('child_process'),
	u 	= require('./utils'),
	npm = require('npm'),
    async = require('async');


const copyDeps = function(opt, callback) {
    const cdCommand = 'cd ' + opt.path;

    u.log('Executing command:' + cdCommand);

    const getLocalLibArray = function () {
    	const prefix = '../node_modules/';
    	const arr = [];
    	const libs = opt.libs.split(' ');
    	libs.forEach(function (item, index){
    		arr.push(prefix + item);
    	});

    	return arr;
    };

    const 
       localLibs = getLocalLibArray(),
	   fns = [];

    localLibs.forEach(function (libPath, index){
        const cpCMD = 'cp -r ' + libPath + ' ' + opt.path + '/node_modules';
        fns.push(function(callback){
            cp.exec(cpCMD,
             function (error, stdout, stderr) {
                 if (error !== null) {
                      u.err('exec error: ' + error);
                      return;
                 }
                 callback(stdout, stderr);
             });
        });
    });

    async.parallel(fns, function (err, results) {
        if (err) {
            u.err('err::' + err);
            return;
        }
        callback && callback(results);
    });
}



const buildProject = function(p) {
    const 
    	dir 		= p['d'],
        name 		= p['n'],
        type 		= p['t'],
        pages 		= p['p'],
        libs 		= p['l'],
        projPath 	= dir + name;

    // 1. make dirs
    makeDirs(projPath + '/data', function(stdout, stderr) {
        const nodeModules = projPath + '/node_modules';
        const jsPath = projPath + '/js';
    	const pagePath = projPath + '/page';
    	cp.spawn('mkdir', [nodeModules, jsPath, pagePath]);

        u.log('Project root directory has been generated successfully...');

        var templatesReady 	= false,
        	scriptReady 	= false,
        	cache 			= {},
        	pageTemplate 	= "./templates/page.tpl",
        	scriptTemplate 	= "./templates/app.tpl",
        	pagePrefix 		= projPath + '/page/page',
        	scriptPrefix 	= projPath + '/js/app';

        // 2. npm dependencies
        copyDeps({
            path: projPath,
            type: type,
            libs: libs
        }, function(stdout, stderr) {

            var fnParseTemplates = function () {
            	if (!templatesReady || !scriptReady) setTimeout(fn, 500);

            	// 4. replace chart libs
		        u.log('tpl:' + cache['page']);
		        u.log('script:' + cache['script']);

		        // 5. create page(s)
		        
                var page = cache['page'].toString();
                    page = page.replace(/{{(.+?)}}/g, function (match, cmd) {
                        var replaced = '';
                        switch (cmd) {
                            case 'TITLE':
                                replaced = 'New Page Title';
                                break;
                            case 'CHART_LIB_PATH':
                                if (type == 'echarts') {
                                    replaced = 'echarts/dist/echarts.min.js';
                                } else if (type == 'd3js'){
                                    replaced = 'd3/dist/d3.min.js';
                                }
                                break;
                        }

                        return replaced;
                    });



                var script = cache['script'].toString();
                    script = script.replace(/{{(.+?)}}/g, function (match, cmd) {
                        var replaced = '';
                        switch (cmd) {
                            case 'CHART':
                                if (type == 'echarts') {
                                    replaced = 'echarts';
                                } else if (type == 'd3js'){
                                    replaced = 'd3';
                                }
                                break;
                        }

                        return replaced;
                    });

                var cnt = 0,
                    tasks = [],
                    getIndex = (function () {
                        var index = 1;
                        return function () {
                            return ++index;
                        };
                    })()


                while (cnt++ < pages) {

                    var fnPage = function (){
                        var pageName = pagePrefix + ~~(getIndex()/2) + '.html';
                        fs.writeFileSync(pageName, page);
                    };
                    var fnScript = function (){
                        var scriptName = scriptPrefix + ~~(getIndex()/2) + '.js';
                        fs.writeFileSync(scriptName, script);
                    };

                    tasks.push(fnPage);
                    tasks.push(fnScript);
                }

                async.parallel(tasks, function (err, results) {
                    u.log('taskResults:' + results);
                });

            };

            fnParseTemplates();
        });

        // async.parallel([

        // ], function (err, results) {

        // });

        // 3. read templates
        fs.readFile(pageTemplate, function (err, data) {
        	if (err) {
        		u.err(err);
        		return;
        	}
        	templatesReady = true;
        	cache['page'] = data;
        }); 

        // 4. read script
        fs.readFile(scriptTemplate, function (err, data) {
        	if (err) {
        		u.err(err);
        		return;
        	}
        	scriptReady = true;
        	cache['script'] = data;
        }); 

    });

};

function makeDirs(path, callback) {
    const mkdirCMD = 'mkdir -p ' + path;
    u.log('Executing command:' + mkdirCMD);
    cp.exec(mkdirCMD, {}, function(err, stdout, stderr) {
        if (err) throw err;
        callback && callback(stdout, stderr);
    });
}



const args = process.argv;

const params = u.parseParams(args.slice(2));

!!params && buildProject(params);
