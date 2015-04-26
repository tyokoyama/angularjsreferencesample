angular.module('app_http', ['ngResource'])
	.factory('usersService', function ($resource) {
		return function() {
			return $resource('/api/users').query();
			};
	});

describe('userServiceのテスト', function() {

	beforeEach(module('app_http'));

	var httpBackend;
	beforeEach(inject(function ($httpBackend) {
		httpBackend = $httpBackend;
	}));

	it('ユーザ一覧が取得できる', inject(function (usersService) {
		httpBackend.expect('GET', '/api/users').respond([
				{userId: 123, name: 'ikezoe'},
				{userId: 100, name: 'kanai'},
				{userId: 101, name: 'yoshida'}
			]);

		var users = usersService();
		expect(users.length).toEqual(0);
		httpBackend.flush();
		expect(users.length).toEqual(3);
	}));

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();

		httpBackend.verifyNoOutstandingRequest();
	});
});