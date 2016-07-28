const 
	fs 	= require('fs'),
	cp 	= require('child_process'),
	u 	= require('./utils'),
	npm = require('npm');


const installDeps = function(opt, callback) {
    const cdCommand = 'cd ' + opt.path;

    u.log('Executing command:' + cdCommand);

    const npmCMD = 'npm install ' + opt.libs + ' --save';
    u.log('Executing command:' + npmCMD);

    var exec = require('child_process').exec,
	    child;

	 child = exec('npm install jquery echarts --save-dev',
	 	{cwd : opt.path},
	 function (error, stdout, stderr) {
	     console.log('stdout: ' + stdout);
	     console.log('stderr: ' + stderr);
	     if (error !== null) {
	          console.log('exec error: ' + error);
	     }
	 });


	// npm.load(function(err) {
	//   // handle errors

	//   // install module ffi
	//   npm.commands.install(['jquery'], function(er, data) {
	//     // log errors or data
	//   });

	//   npm.on('log', function(message) {
	//     // log installation progress
	//     console.log(message);
	//   });
	// });

 //    cp.exec('npm install '+ opt.libs +' --save', 
 //    	{cwd : opt.path}, 
 //    	function (err, stdout, stderr) {
 //    	if (err) {
 //    		u.err(err);
 //    		return;
 //    	}

 //    	callback && callback(stdout, stderr);
 //    });
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
    makeDirs(projPath, function(stdout, stderr) {
        u.log('Project directory has been generated successfully...');

        var templatesReady 	= false,
        	scriptReady 	= false,
        	cache 			= {},
        	pageTemplate 	= projPath + "/template/page.tpl",
        	scriptTemplate 	= projPath + "/template/app.tpl",
        	pagePrefix 		= projPath + '/page',
        	scriptName 		= projPath + '/app.js';

        // 2. npm dependencies
        installDeps({
            path: projPath,
            type: type,
            libs: libs
        }, function(stdout, stderr) {
            u.log('stdout: ' + stdout);
            u.log('stderr: ' + stderr);

            var fnParseTemplates = function () {
            	if (!templatesReady || !scriptReady) setTimeout(fn, 500);

            	// 4. replace chart libs
		        // 
		        // 


		        // 5. create page(s)
		        // 
		        // 
            };

            fnParseTemplates();
        });

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

function makeDirs(projPath, callback) {
    const mkdirCMD = 'mkdir -p ' + projPath + '/data';
    u.log('Executing command:' + mkdirCMD);
    cp.exec(mkdirCMD, {}, function(err, stdout, stderr) {
        if (err) throw err;
        callback && callback(stdout, stderr);
    });
}



const args = process.argv;

const params = u.parseParams(args.slice(2));

buildProject(params);
