var app = angular.module('gogo', [
    'ngRoute',
    'ngSanitize',
    'rt.encodeuri',
    'toastr',
    'ymaps',
    'ui.bootstrap'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'app/views/index.view.html',
            controller: 'IndexCtrl'
        }).
        when('/search/', {
            templateUrl: 'app/views/search.view.html',
            controller: 'SearchCtrl'
        }).
        when('/maps/', {
            templateUrl: 'app/views/maps.view.html',
            controller: 'MapsCtrl'
        }).
        when('/translate/', {
            templateUrl: 'app/views/translate.view.html',
            controller: 'TranslateCtrl'
        }).
        when('/signup/', {
            templateUrl: 'app/views/signup.view.html',
            controller: 'SignupCtrl'
        }).
        when('/signin/', {
            templateUrl: 'app/views/signin.view.html',
            controller: 'SigninCtrl'
        }).
        when('/signout/', {
            templateUrl: 'app/views/signout.view.html',
            controller: 'SignoutCtrl'
        }).
        when('/test/', {
            templateUrl: 'app/views/test.view.html',
            controller: 'TestCtrl'
        }).
        otherwise({
            redirectTo: '/'
        })
}]);

app.controller('MainCtrl', ['$scope','$http', 'Global', function($scope, $http, Global) {
    //$scope.test = 'ilya mainctrl';
    //$scope.ilya = 1;
    $scope.test = Global.get();

    // get info
    /*
    if (!$scope.user) {
        $http.get('/slim/users/me', {
    })
    .then(function onSuccess(response) {
        //$scope.user = response.data.data;

        //$location.path('/');
    })
    .catch(function onError(err) {

    });
    }*/
}]);

app.run(function($rootScope) {
    $rootScope.getUser = function()
    {
        //alert('Rootscope get user');
    }
});



app.filter('escape', function() {
    return window.decodeURIComponent;
});