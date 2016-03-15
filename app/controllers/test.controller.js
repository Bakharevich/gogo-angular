angular.module("gogo")

.controller('TestCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('/api/results.php?q=' + $routeParams.word).success(function(data) {
        $scope.results = data.results;
    });
}]);