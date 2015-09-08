var path = require('path');
var Q = require('q');
var exec = require('child-process-promise').exec;
var chalk = require('chalk');

exports.deploy = function(dir) {
  // add && commit first
  var cmd = 'git add . && git commit -m "deploy canner output to gh-pages"';
  exec(cmd);

  // push to gh-pages
  if (dir) {
    cmd = 'git subtree push --prefix ' + dir + ' origin gh-pages';
  } else {
    cmd = 'git push origin master:refs/heads/gh-pages --force';
  }

  return exec(cmd);
};
