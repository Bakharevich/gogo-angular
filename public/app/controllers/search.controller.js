angular.module("gogo")

.controller('SearchCtrl', ['$scope', '$http', '$routeParams', '$location', '$compile', '$log', 'toastr', 'YandexSearch', function($scope, $http, $routeParams, $location, $compile, $log, toastr, YandexSearch) {
    if (!$scope.query && $routeParams.query) $scope.query = $routeParams.query;
    else $scope.query = '';

    if ($routeParams.page == null) $scope.page = 1;
    else $scope.page = parseInt($routeParams.page);

    if ($routeParams.engine == null) $scope.engine = 'yandex';
    else $scope.engine = $routeParams.engine;

    if ($routeParams.region == null) $scope.region = 149;
    else $scope.region = $routeParams.region;

    if ($routeParams.sort == null) $scope.sort = 'rlv';
    else $scope.sort = $routeParams.sort;

    if ($routeParams.domain == null) $scope.domain = '';
    else $scope.domain = $routeParams.domain;

    // send request
    $scope.searchRequest = function() {
        // showing loading animation
        $scope.loadingSearch = true;
        $scope.results = {};

        // set values
        YandexSearch.setQuery($scope.query);
        YandexSearch.setPage($scope.page);
        YandexSearch.setRegion($scope.region);
        YandexSearch.setSort($scope.sort);
        YandexSearch.setDomain($scope.domain);

        // send request
        YandexSearch.sendRequest().then(
            function (results) {
                $scope.results = results;
            }
        );

        // turn off animation
        setTimeout(function() {
            $scope.loadingSearch = false;
        }, 40);

        // direct premium request

        $http.get('api/premium_top.php?word=' + $scope.query + '&page=' + $scope.page).success(function (data) {
            html = $compile(data)($scope);

            $('#yandex-premium-top').html(html);
        });

        // direct right request
        $http.get('api/premium_right.php?word=' + $scope.query + '&page=' + $scope.page).success(function (data) {
            html = $compile(data)($scope);

            $('#yandex-premium-right').html(html);
        });

    }

    // paging
    $scope.pageChanged = function() {
        $scope.goRequest();
    };

    $scope.sendCaptcha = function()
    {
        // send captcha value
        $http({
            method: 'GET',
            url: '/api/checkcaptcha.php?key=' + $scope.results.key + '&rep=' + $scope.captchaValue
        }).then(function succcessCallback(response) {
            // try search one more time
            //$scope.searchRequest(word_decoded + ' ', $scope.page);
        }, function errorCallback(response) {
            alert("error!");
        });
    }

    $scope.changeSort = function(sort)
    {
        $scope.sort = sort;
        $scope.page = 1;
        var obj = {'page' : 1};

        $scope.goRequest();
    }

    $scope.changeRegion = function(region)
    {
        $scope.region = region;
        $scope.page = 1;
        var obj = {'page' : 1};

        $scope.goRequest();
    }
    
    $scope.goRequest = function()
    {
        var request = {};
        request.query = $scope.query;
        request.page = $scope.page;
        request.region = $scope.region;
        request.sort = $scope.sort;
        request.domain = $scope.domain;

        if (request.query) {
            $location.path('/search/').search(request);
        }
        else {
            alert('Введите поисковой запрос');
        }
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

    $scope.onSelect = function($item, $model, $callback, request) {
        $scope.goRequest();
    }

    //
    // DO SOME JOB!
    //

    // make request
    $scope.searchRequest();
}]);