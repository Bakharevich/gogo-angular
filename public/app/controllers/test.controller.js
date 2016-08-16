angular.module("gogo")

.controller('TestCtrl', ['$scope', '$http', '$routeParams', 'YandexSearch', function($scope, $http, $routeParams, YandexSearch) {
    YandexSearch.setRegion(123);
}]);