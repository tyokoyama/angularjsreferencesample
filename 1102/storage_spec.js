describe("storage controller test", function () {
	beforeEach(module('app.storage'));
	beforeEach(module(function ($provide) {
		$provide.decorator('webStorage', function ($delegate) {
			var callbacks = [];
			$delegate.on = function (callback) {
				callbacks.push(callback);
			};

			$delegate.raiseEvent = function (event) {
				angular.forEach(callbacks, function (callback) {
					callback(event);
				});
			};

			return $delegate;
		});
	}));

	it ("webStorage.onイベントによる更新処理", inject(function($controller, $rootScope, webStorage) {
		var scope = $rootScope.$new();
		$controller('storageController', {$scope: scope});

		webStorage.clear();
		expect(scope.items).toEqual([]);

		var storage = webStorage('test');
		storage.set(1234);
		expect(scope.items).toEqual([]);

		webStorage.raiseEvent();
		expect(scope.items[0].name).toEqual('test');
	}));
});
