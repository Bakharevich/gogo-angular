var app = angular.module('gogo', ['ngRoute', 'ngSanitize', 'rt.encodeuri', 'bw.paging']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'app/views/index.view.html',
            controller: 'IndexCtrl'
        }).
        when('/search/:word', {
            templateUrl: 'app/views/search.view.html',
            controller: 'SearchCtrl'
        }).
        when('/search/:word/:page', {
            templateUrl: 'app/views/search.view.html',
            controller: 'SearchCtrl'
        }).
        when('/maps/', {
            templateUrl: 'app/views/maps.view.html',
            controller: 'MapsCtrl'
        }).
        when('/test/', {
            templateUrl: 'app/views/test.view.html',
            controller: 'TestCtrl'
        }).
        otherwise({
            redirectTo: '/'
        })
}]);

app.run(function($rootScope) {
    /*
    $rootScope.searchMain = function() {
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
})

app.filter('limitToDots', function(limitToFilter) {
    return function(text, limit) {
        if (text.length >= limit) {
            return limitToFilter(text, limit) + '...';
        }
        else {
            return limitToFilter(text, limit);
        }
    }
});

app.filter('escape', function() {
    return window.decodeURIComponent;
});