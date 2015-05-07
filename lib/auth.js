var prompt = require('prompt');
var Q= require('q');
var url= require('url');
var rp = require('request-promise');
var host= 'http://canner.io/';

// login
exports.login= function () {
	// ask for username&password
	ask_for_credentials().then(function (credentials) {
		// write credentials to netrc
		
	})
	
	// if exist, overwrite
	// get_user_info to validate
}

exports.logout= function () {
	// delete the credentials in netrc
}

// ask_for_credentials
// return a promise with {username, token}
exports.ask_for_credentials= function () {
	var username;
	var schema = {
	    properties: {
	      username: {
	        pattern: /^[a-zA-Z0-9_\-]+$/i,
	        message: 'Name must be only letters, spaces, or dashes',
	        required: true
	      },
	      password: {
	        hidden: true
	      }
	    }
	  };

	// Start the prompt
	prompt.start();
	// Get two properties from the user: username and password
	return Q.nfcall(prompt.get, ['username', 'password'])
	 		.then(function (result) {
	 			// cache username
	 			username= result.username;
	 			// get the token
	 			var tokenUrl= url.resolve(host, '/users/me/token');
	 			return rp({
	 				uri: tokenUrl,
	 				method: 'GET',
	 				auth: {
	 					'user': username,
    					'pass': result.password,
    					'sendImmediately': false
	 				},
	 				json: true
	 			})
	 		})

	 		.then(function (res, body) {
	 			// return username, token
	 			return { username: username, token: body.token };
	 		})
	
}