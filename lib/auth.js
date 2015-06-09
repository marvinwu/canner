var prompt = require('prompt');
var Q= require('q');
var url= require('url');
var netrc = require('netrc2');
var chalk= require('chalk');
var rp = require('request-promise');
var FS= require('q-io/fs');
var fs= require('fs');
var client= require('./client');

// constant in helper
var helper= require('./helper');
var host= helper.host;
var domain= helper.domain;


// login
exports.login= function () {
	// ask for username&password
	return ask_for_credentials()

	.then(saveInNetrc)

	.then(client.greeting)
}

exports.logout= function () {
	// delete the credentials in netrc
	var machines = netrc();
	delete machines[domain];
	return Q(machines.save());
}

exports.getCredentials= function () {
	var auth;
	// see if exist in netrc
	try{
		var machines = netrc();
		auth = machines[domain];
	}catch(err){
		// if err= 'ENOENT'
		// Error Entry not exist
		// make one, path= err.path
		console.log(chalk.magenta('.netrc not found! we create one for you!'));
		fs.writeFileSync(err.path, '');
	}
	

	// true return
	if(auth)
		return { username: auth[0], token: auth[1] };
	
	// false ask
	return ask_for_credentials().then(saveInNetrc);
}

// ask_for_credentials
// return a promise with {username, token}
var ask_for_credentials= exports.ask_for_credentials= function () {
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
	return Q.nfcall(prompt.get, schema)
	 		.then(function (result) {
	 			// cache username
	 			username= result.username;
	 			// get the token
	 			return client.getUserToken(username, result.password);
	 		})

	 		.then(function (body) {
	 			// return username, token
	 			return { username: username, token: body.token };
	 		})
	
}


var saveInNetrc= function (credentials) {
	// write credentials to netrc
	
	var machines = netrc();
	
	// login and password
	// if exist, overwrite
	machines[domain]= [credentials.username, credentials.token];
	machines.save();
	return credentials;
}