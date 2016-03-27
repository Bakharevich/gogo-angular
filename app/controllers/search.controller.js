angular.module("gogo")

.controller('SearchCtrl', ['$scope', '$http', '$routeParams', '$location', '$compile', '$log', 'toastr', function($scope, $http, $routeParams, $location, $compile, $log, toastr) {
    var word = $routeParams.word;
    var word_decoded = window.decodeURIComponent(word);
    if ($routeParams.page == null) $scope.page = 1;
    else $scope.page = $routeParams.page;

    $scope.word = word_decoded;

    $scope.loadingSearch = true;

    // send request
    /*
    $http.get('/api/results.php?q=' + word + '&p=' + $scope.page).success(function(data) {
        $scope.results = data.results;
    });*/
    $http({
        method: 'GET',
        url: '/api/results.php?q=' + word + '&p=' + $scope.page
    }).then(function succcessCallback(response) {
        console.log(response.data);
        $scope.results = response.data;
    }, function errorCallback(response) {
        alert("error!");
    });



    // direct premium request
    $http.get('api/premium_top.php?word=' + word + '&page=' + $scope.page).success(function (data) {
        html = $compile(data)($scope);

        $('#yandex-premium-top').html(html);
    });

    // direct right request
    $http.get('api/premium_right.php?word=' + word + '&page=' + $scope.page).success(function (data) {
        html = $compile(data)($scope);

        $('#yandex-premium-right').html(html);
    });

    setTimeout(function() {
        $scope.loadingSearch = false;
    }, 40);


    // paging
    $scope.DoCtrlPagingAct = function(text, page, pageSize, total, word) {
        $scope.searchRequest(word, page);
    };

    // show dev message
    $scope.showDevMsg = function()
    {
        toastr.info(
            'That function is under construction',
            'Not working',
            {closeButton: true}
        );
    }

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

    $scope.sendCaptcha = function()
    {
        // send captcha value
        $http({
            method: 'GET',
            url: '/api/checkcaptcha.php?key=' + $scope.results.key + '&rep=' + $scope.captchaValue
        }).then(function succcessCallback(response) {
            console.log(response.data);
            $scope.captchaData = response.data;
        }, function errorCallback(response) {
            alert("error!");
        });

        // try search one more time
        $scope.searchRequest(word, $scope.page);
    }
}]);