var app = angular.module('app.rating', [])
			.directive('rating', [function($timeout) {
				return {
						restrict: 'E',
						require: 'ngModel',
						scope: {
							max: '=',
							readonly: '='
						},
						link: function(scope, element, attrs, ngModelCtrl) {
							ngModelCtrl.$render = function() {
								updateRate(ngModelCtrl.$viewValue);
							};

							function updateRate(rate) {
								angular.forEach(element.children(), function(child) {
									angular.element(child).off('click');
								});
								element.empty();

								for(var i = 0; i < scope.max; i++) {
									var span = angular.element('<span></span>');
									var star = i < rate ? '★' : '☆';
									span.text(star);

									if(!scope.readonly) {
										span.addClass('changeable');
										(function() {
											var count = i + 1;
											span.on('click', function() {
												scope.$apply(function() {
													ngModelCtrl.$setViewValue(count);
													updateRate(count);
												});
											});
										})();
									}
									element.append(span);
								}
							}

							ngModelCtrl.$formatters.push(function (rate){
								if(rate < 0) {
									return 0;
								} else if(rate > scope.max) {
									return scope.max;
								} else {
									return rate;
								}
							});
						}
					};
			}]);
	app.controller('notificationController', ['$scope', function($scope) {
		$scope.items = [];
		$scope.addMessage = function(message) {
			$scope.items.push({message: message, time: new Date(), enableMessage: true});
		}
	}]);