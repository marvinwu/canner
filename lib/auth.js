var prompt = require('prompt');
var Q= require('q');
var url= require('url');
var rp = require('request-promise');
var netrc = require('netrc2');
var chalk= require('chalk');

var host= 'http://www.canner.io/';
var throwErr= function (err) {
	throw err;
}

// login
exports.login= function () {
	var domain= 'www.canner.io';
	// ask for username&password
	ask_for_credentials().then(function (credentials) {
		// write credentials to netrc
		var machines = netrc();

		// login and password
		// if exist, overwrite
		machines[domain]= [credentials.username, credentials.token];
		machines.save();
	}, throwErr)

	.then(function () {
		var machines = netrc();
		var auth = machines[domain];
		var login = auth[0];
		var password = auth[1];

		// get_user_info to validate
		var userUrl= url.resolve(host, '/users/me');
		return rp({
	 				uri: userUrl,
	 				method: 'GET',
	 				auth: {
	 					'user': login,
    					'pass': password,
    					'sendImmediately': false
	 				},
	 				json: true
	 			});
	}, throwErr)

	.then(function (res, body) {
		console.log(chalk.green('welcome '+body.username+'!'));
	}, throwErr)
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
	 		}, throwErr)

	 		.then(function (res, body) {
	 			// return username, token
	 			return { username: username, token: body.token };
	 		}, throwErr)
	
}