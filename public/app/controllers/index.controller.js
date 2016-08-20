angular.module("gogo")

.controller('IndexCtrl', ['$scope', '$http', '$routeParams', '$location', '$sce', 'toastr',  function($scope, $http, $routeParams, $location, $sce, toastr) {
    // send request
    $scope.searchRequest = function(request) {
        request.page = 1;
        request.region = 157;
        request.sort = 'rlv';

        if (request.query) {
            $location.path('/search/').search(request);
        }
        else {
            alert('Введите поисковой запрос');
        }
    }

    $scope.onSelect = function($item, $model, $callback, request) {
        $scope.searchRequest(request);
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


    $scope.getSuggestion = function(val) {
        return $http.get('/api/suggest.php', {
            params: {
                query: val
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item;
            });
        });
    }

}]);