// 複数のファイルをまとめてテストをする時はモジュール名に注意。
// 同じ名前にすると、後のものが勝つ（上書きされる）みたい。
angular.module('app2', [])
	.filter('upperFilter', function () {
		return function (input) {
			return angular.uppercase(input);
		};
	});

describe("upperFilterのテスト", function() {
	beforeEach(module('app2'));

	it("入力文字列が大文字に変換される", inject(function ($filter) {
		var upperFilter = $filter('upperFilter');
		expect(upperFilter('hello, world!')).toEqual('HELLO, WORLD!');
	}));
});