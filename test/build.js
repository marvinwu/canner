var Q = require('q');
var canner = require('../index');


describe('build canner.json', function() {
	it("should build canner.json to html", function(done) {
		canner.build(__dirname + '/original/canner.json')
			.then(function() {
				done();
			})
			.catch(function(err) {
				console.error(err)
			})
	})
})
