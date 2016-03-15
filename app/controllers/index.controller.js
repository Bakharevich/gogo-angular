angular.module("gogo")

.controller('IndexCtrl', ['$scope', '$http', '$routeParams', '$location', '$sce', function($scope, $http, $routeParams, $location, $sce) {
        /*
    $scope.searchMain = function() {
        var word = $scope.word;
        var word_encoded = window.encodeURIComponent(word);

        if (word) {
            $location.path('/search/' + word_encoded);
        }
        else {
            alert('Type the search request');
        }
    }
    */
    // send request
    $scope.searchRequest = function(word, page) {
        //var word = $scope.word;
        var word_encoded = window.encodeURIComponent(word);
        page = parseInt(page);

        $scope.page = page;

        if (word) {
            $location.path('/search/' + word_encoded + '/' + page);
        }
        else {
            alert('Type the search request');
        }
    }
}]);