angular.module("gogo")

.controller('IndexCtrl', ['$scope', '$http', '$routeParams', '$location', '$sce', 'toastr', 'Global', function($scope, $http, $routeParams, $location, $sce, toastr, Global) {
    // send request
    $scope.searchRequest = function(request) {
        //var query_encoded = window.encodeURIComponent(request.query);
        //page = parseInt(page);

        //console.log(request);

        request.page = 1;
        request.region = 157;
        request.sort = 'rlv';

        //console.log(request);

        //var requestString = objectToParams(request);

        //console.log(requestString);

        if (request.query) {
            //var url = "/search/?" + requestString;
            //$location.path('/search/' + word_encoded + '/' + page + '/' + region + '/' + sort + '/' + 'yandex');
            //console.log('Going to ' + url);
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