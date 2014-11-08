var Q = require('q');
var fs = require('fs-extra');
var stage = require('node-stage');
var path = require('path');

function initDir(dir) {
	var copy = Q.nfbind(fs.copy);
	var mkdir = Q.nfbind(fs.mkdirs)
	var dir = path.resolve(dir);

	// building directories
	Q.nfcall(fs.exists, dir)

	.then(function(result) {
		stage.success('Building the directories...')
		return mkdir(dir)
	})

	.fail(function() {
		stage.error('The directory is already exist!')
	})

	// initial copy docgr.json
	Q.nfcall(fs.exists, path.resolve(dir, 'docgr.json'))

	.then(function() {		
		return copy(path.resolve(__dirname, '../init/docgr.json'), path.resolve(dir, 'docgr.json'))
		.done(function() {
			stage.success('Success generate ' + path.resolve(dir, 'docgr.json'))
		})
	})

	.fail(function() {
		stage.error(path.resolve(dir, 'docgr.json') + ' is already exist!')
	})


	// initial copy index.hbs
	Q.nfcall(fs.exists, path.resolve(dir, 'index.hbs'))

	.then(function() {
		return copy(path.resolve(__dirname, '../init/index.hbs'), path.resolve(dir, 'index.hbs'))
		.done(function() {
			stage.success('Success generate ' + path.resolve(dir, 'index.hbs'))
		})
	})

	.fail(function() {
		stage.error(path.resolve(dir, 'index.hbs') + ' is already exist!')
	})

}
module.exports = initDir;