var rp = require('request-promise');
var url= require('url');
var util= require('util');

// constant in helper
var helper= require('./helper');
var host= helper.host;

// greeting when login, and test
// ping to server
exports.greeting= function (credentials) {
	// get_user_info to validate
	return httpReq('/ping', 'GET', credentials);
}


// create an app
// url is optional
exports.createApp= function (appUrl, credentials) {
	return httpReq('/apps', 'POST', credentials, {
				body:{
 					url: appUrl
 				}
 			});
}

// get app info
exports.getApp= function (appUrl, credentials) {
	return httpReq('/apps/'+appUrl, 'GET', credentials);
}


// deploy app
exports.deployApp= function (appUrl, credentials) {
	return httpReq(util.format('/apps/%s/deploy', appUrl), 'GET', credentials);
}

function httpReq (destUrl, method, credentials, obj) {
	var _url= url.resolve(host, destUrl);
	var opts= {
 				uri: _url,
 				method: method,
 				auth: {
 					'user': credentials.username,
					'pass': credentials.token
 				},
 				json: true
 			}
 	if(obj)
 		opts= Object.assign(opts, obj);

	return rp(opts);
}