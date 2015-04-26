angular.module('app.filter', [])
	.filter('upperFilter', function() {
		return function (input) {
			if (angular.isDefined(input) && !angular.isString(input)) {
				throw Error('input type is not String.');
			}

			return angular.uppercase(input);
		};
	});

describe("filter test", function() {
	beforeEach(module('app.filter'));

	it("補足できる例外の確認", inject(function($filter) {
		var filter = $filter('upperFilter');
		expect(function() {
			filter(123);
		}).toThrow(new Error('input type is not String.'));
	}));
});

angular.module('app.service', [])
	.factory('timerService', function ($timeout) {
		return function(time) {
			var promise = $timeout(function () {
				throw Error('timeout');
			}, time);
			return function () {
				$timeout.cancel(promise);
			}
		}
	});

describe("filter test", function() {
	beforeEach(module('app.service'));
	beforeEach(module(function ($exceptionHandlerProvider) {
		$exceptionHandlerProvider.mode('log');
	}));

	it("補足されない例外の発生確認", inject(function (timerService, $timeout, $exceptionHandler) {
		expect($exceptionHandler.errors).toEqual([]);

		var cancel = timerService(10000);
		$timeout.flush();

		expect($exceptionHandler.errors[0].message).toEqual('timeout');
	}));
});
