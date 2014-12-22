var canner= require('../');
canner.read('sample-can', '/canner.json')
	  .done(function (content) {
	  	console.log(content);
	  }, function (err) {
	  	console.log(err);
	  })