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
		_mkDir(dir, mkdir);
		_copyDir(generator_path, dir, generator_can);

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
				_mkDir(dir, mkdir);
				_copyDir(generator_path, dir, generator_can);
			}else {
				stage.error('You haven\'t install can "' + generator_can + '"');
				return process.exit(3);
			}

		})
	}
}

function _copyDir(generator_path, dir, generator) {

	var gen_path = path.resolve(generator_path);
	var exist_ignore = fs.existsSync(path.join(gen_path, '.canignore'));

	if(exist_ignore)
		var ignore_arr = _parseIgnore(gen_path) || [];
	else
		var ignore_arr = [];

	var filter = function(s) { 
		var base = path.basename(s);
		var first = base.charAt(0);

		return base !== "package.json" && first !== "." && ignore_arr.indexOf(base) === -1;
	}

	Q.nfcall(fs.copy, gen_path, dir, filter)

	.then(function() {		
		stage.success('Done! Initialized your project using generator "' + generator + '" ! Checkout directory: ' + dir);
	})

	.fail(function(err) {
		stage.error("Copy error: " + err);
		return process.exit(2);
	})
}

function _mkDir(dir, mkdir) {
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

function _parseIgnore(gen_path) {
	var ignore_file = fs.readFileSync(path.join(gen_path, '.canignore'), {encoding: 'utf8'});
	return ignore_file.match(/[^\r\n]+/g);
}

module.exports = initDir;