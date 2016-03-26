angular.module("gogo")

.controller('IndexCtrl', ['$scope', '$http', '$routeParams', '$location', '$sce', 'toastr', 'Global', function($scope, $http, $routeParams, $location, $sce, toastr, Global) {
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