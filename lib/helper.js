// constant
// host
// in dev, export CANNER_HOST='http://local.host:3000'
var host= exports.host= process.env['CANNER_HOST'] || 'http://www.canner.io/';

// domain
// in dev, export CANNER_DOMAIN='www.local.host'
// used for basicAuth
var domain= exports.domain= process.env['CANNER_DOMAIN'] || 'www.canner.io';

// git host
// use for git url
// in dev, export CANNER_GIT_HOST='git.local.host:3000'
var git_host= exports.git_host= process.env['CANNER_GIT_HOST'] || 'git.canner.io';