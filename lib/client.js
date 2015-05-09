var rp = require('request-promise');
var url= require('url');

// constant in helper
var helper= require('./helper');
var host= helper.host;

// greeting when login, and test
// ping to server
exports.greeting= function (credentials) {
	// get_user_info to validate
	var userUrl= url.resolve(host, '/ping');
	return rp({
 				uri: userUrl,
 				method: 'GET',
 				auth: {
 					'user': credentials.username,
					'pass': credentials.token
 				},
 				json: true
 			});
}


// create an app
// url is optional
exports.createApp= function (appUrl, credentials) {
	var _url= url.resolve(host, '/apps');
	return rp({
 				uri: _url,
 				method: 'POST',
 				auth: {
 					'user': credentials.username,
					'pass': credentials.token
 				},
 				body:{
 					url: appUrl
 				},
 				json: true
 			})

}

// get app info
exports.getApp= function (appUrl, credentials) {
	var _url= url.resolve(host, '/apps/'+appUrl);
	return rp({
 				uri: _url,
 				method: 'GET',
 				auth: {
 					'user': credentials.username,
					'pass': credentials.token
 				},
 				body:{
 					url: appUrl
 				},
 				json: true
 			})
}
