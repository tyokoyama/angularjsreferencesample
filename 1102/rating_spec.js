describe('ratingディレクティブのテスト', function () {
	var element;
	var $scope;

	beforeEach(module("app.rating"));
	beforeEach(inject(function ($compile, $rootScope) {
		element = angular.element('<rating ng-model="rate" max="5"></rating>');
		var linkFn = $compile(element);

		$scope = $rootScope.$new();
		linkFn($scope);
	}));

	it('星3つです', function () {
		$scope.$digest();
		expect(element.text()).toBe('☆☆☆☆☆');

		$scope.rate = 3;
		$scope.$digest();
		expect(element.text()).toBe('★★★☆☆');

		dump(element);
	})
});
