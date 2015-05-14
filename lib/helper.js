// constant
// host
// in dev, export CANNER_HOST='http://local.host:3000'
var ENV= process.env['CANNER_ENV'];
if(ENV=='dev')
	var host= 'http://local.host:3000';
else
	var host= 'http://www.canner.io/';
exports.host= host;

// domain
// in dev, export CANNER_DOMAIN='www.local.host'
// used for basicAuth
if(ENV=='dev')
	var domain= 'www.local.host';
else
	var domain= 'www.canner.io';
exports.domain= domain;

// git host
// use for git url
// in dev, export CANNER_GIT_HOST='git.local.host:3000'
if(ENV=='dev')
	var git_host= 'git.local.host:3000';
else
	var git_host= 'git.canner.io';
exports.git_host=git_host;