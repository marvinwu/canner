var Q = require('q');
var fs = require('fs-extra');
var stage = require('node-stage');
var path = require('path');
var npm = require('npm');

var exec = require('child_process').exec;

var get = require('../lib/get');

function initDir(dir, generator) {
	var mkdir = Q.nfbind(fs.mkdirs)
	var dir = path.resolve(dir);


	if(!generator) {
		var generator_path = path.resolve(__dirname, '../init');
		var generator_can = 'Init';
		_mk_dir(dir, mkdir);
		_copy_dir(generator_path, dir, generator_can);

	}else {
		// build by using generators

		Q.nfcall(exec, 'npm config get prefix')

		.then(function(stdout, stderr) {
			// get prefix route
			var generator_can = generator + '-can';
			var prefix = stdout[0].replace(/(\r\n|\n|\r)/gm,"");
			var generator_path = prefix + '/lib/node_modules/' + generator_can;
			var pkg_exist = fs.existsSync(generator_path);

			if(pkg_exist) {
				// have already installed generator
				_mk_dir(dir, mkdir);
				_copy_dir(generator_path, dir, generator_can);
			}else {
				stage.error('You haven\'t install can "' + generator_can + '"');
				return process.exit(3);
			}

		})
	}
}

function _copy_dir(generator_path, dir, generator) {
	
	var filter = function(s) { 
		var ext = s.split(".").pop();
		var base = path.basename(s);
		var first = base.charAt(0);

		return base !== "package.json" && first !== ".";
	}

	Q.nfcall(fs.copy, path.resolve(generator_path), dir, filter)

	.then(function() {		
		stage.success('Done! Initialized your project using generator "' + generator + '" ! Checkout directory: ' + dir);
	})

	.fail(function(err) {
		stage.error("Copy error: " + err);
		return process.exit(2);
	})
}

function _mk_dir(dir, mkdir) {
	// building directories

	var exist = fs.existsSync(dir);
	stage.process('Building the directories...')
	
	var build_dir = fs.mkdirsSync(dir);

	if(build_dir) {
		stage.success('Successfully build directory...')
	}else {
		stage.error('The directory is already exist!');
		return process.exit(1);
	}
}

module.exports = initDir;