angular.module("gogo")

.controller('IndexCtrl', ['$scope', '$http', '$routeParams', '$location', '$sce', 'toastr', 'Global', function($scope, $http, $routeParams, $location, $sce, toastr, Global) {
    // send request
    $scope.searchRequest = function(word, page, region, sort) {
        //var word = $scope.word;
        var word_encoded = window.encodeURIComponent(word);
        page = parseInt(page);

        var page = 1;
        var region = 157;
        var sort = 'rlv';

        if (word) {
            $location.path('/search/' + word_encoded + '/' + page + '/' + region + '/' + sort + '/' + 'yandex');
        }
        else {
            alert('Type the search request');
        }
    }

    // get info
    if (!$scope.user) {
        $http.get('/slim/users/me', {

        })
        .then(function onSuccess(response) {
            $scope.user = response.data.data;

            //$location.path('/');
        })
        .catch(function onError(err) {

        });
    }
}]);