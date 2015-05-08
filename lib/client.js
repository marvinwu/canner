var rp = require('request-promise');
var url= require('url');

// constant in helper
var helper= require('./helper');
var host= helper.host;

exports.greeting= function (credentials) {
	// get_user_info to validate
	var userUrl= url.resolve(host, '/users/me');
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