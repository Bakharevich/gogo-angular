angular.module("gogo")

.controller('IndexCtrl', ['$scope', '$http', '$routeParams', '$location', '$sce', 'toastr', 'Global', function($scope, $http, $routeParams, $location, $sce, toastr, Global) {
    // send request
    $scope.searchRequest = function(request) {
        request.page = 1;
        request.region = 157;
        request.sort = 'rlv';

        if (request.query) {
            request.query = encodeURIComponent(request.query);

            $location.path('/search/').search(request);
        }
        else {
            alert('Введите поисковой запрос');
        }
    }

    // get info
    if (!$scope.user) {
        /*
        $http.get('/slim/users/me', {

        })
        .then(function onSuccess(response) {
            $scope.user = response.data.data;

            //$location.path('/');
        })
        .catch(function onError(err) {

        });
        */
    }
}]);