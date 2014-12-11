var _ = require('lodash');
var prog = require('commander');
var fileSave = require('file-save');
var allin_html = require('allin');
var path = require('path');
var Q = require('q');

var build = require('./lib/build');
var init = require('./lib/init');
var get = require('./lib/get');

/*
*	Create
*	Create initial files and folders, under a directory.
*	@param {string} dir - directory install canner
*	@param {string} generator - Inital generate the generator that you are finding
*/


/*
*	Build
*	Build a canner from a canner.json
*	@param {string} dir - source to canner.json, default ./canner.json
*	@param {object} options - options
*/


/*
*	Watch
*	Watching any changes in a canner and recompiled
*	@param {string} dir - source to canner.json, default ./canner.json
*	@param {object} options - options
*/


/*
*	Allin
*	Make html include files all warp allin
*	@param {string} htmlfile - source to your html, default ./index.html
*	@param {object} options - options
*/