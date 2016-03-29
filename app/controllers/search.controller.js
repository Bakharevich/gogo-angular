angular.module("gogo")

.controller('SearchCtrl', ['$scope', '$http', '$routeParams', '$location', '$compile', '$log', 'toastr', function($scope, $http, $routeParams, $location, $compile, $log, toastr) {
    $scope.word = $routeParams.word;
    $scope.word_decoded = window.decodeURIComponent($routeParams.word);
    $scope.word_encoded = window.encodeURIComponent($routeParams.word);

    if ($routeParams.page == null) $scope.page = 1;
    else $scope.page = parseInt($routeParams.page);

    if ($routeParams.engine == null) $scope.engine = 'yandex';
    else $scope.engine = $routeParams.engine;

    if ($routeParams.region == null) $scope.region = 149;
    else $scope.region = $routeParams.region;

    if ($routeParams.sort == null) $scope.sort = 'rlv';
    else $scope.sort = $routeParams.sort;

    if ($routeParams.engine == null) $scope.engine = 'yandex';
    else $scope.engine = $routeParams.engine;

    // showing loading animation
    $scope.loadingSearch = true;

    // send request
    $http({
        method: 'GET',
        url: '/api/results.php?q=' + $scope.word_decoded + '&p=' + $scope.page + '&region=' + $scope.region + '&sort=' + $scope.sort + '&engine=' + $scope.engine
    }).then(function succcessCallback(response) {
        console.log(response.data);
        $scope.results = response.data;
    }, function errorCallback(response) {
        alert("error!");
    });

    // direct premium request
    $http.get('api/premium_top.php?word=' + $scope.word_decoded + '&page=' + $scope.page).success(function (data) {
        html = $compile(data)($scope);

        $('#yandex-premium-top').html(html);
    });

    // direct right request
    $http.get('api/premium_right.php?word=' + $scope.word_decoded + '&page=' + $scope.page).success(function (data) {
        html = $compile(data)($scope);

        $('#yandex-premium-right').html(html);
    });

    // turn off animation
    setTimeout(function() {
        $scope.loadingSearch = false;
    }, 40);

    // paging
    $scope.DoCtrlPagingAct = function(text, page, pageSize, total, word, region, sort) {
        $scope.page = page;

        $scope.searchRequest({});
    };

    // send request
    $scope.searchRequest = function(obj) {
        if (obj.page) page = obj.page;
        else page = $scope.page;

        $location.path('/search/' + $scope.word_decoded + '/' + page + '/' + $scope.region + '/' + $scope.sort + '/' + 'yandex');
    }

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

        $scope.searchRequest(obj);
    }

    $scope.changeRegion = function(region)
    {
        $scope.region = region;
        $scope.page = 1;
        var obj = {'page' : 1};

        $scope.searchRequest(obj);
    }
}]);