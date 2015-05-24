var auth= require('../lib/auth');

describe('auth api', function () {
	it('should login', function (done) {
		auth.login().then(function () {
			console.log("ok");
		}, function (err) {
			console.log(err);
		})
	})
})

