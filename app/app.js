(function(){
    //alert('Function app.js');
    var myApp = angular.module('myApp', ['ngRoute']);

    myApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'app/views/main.html'
            })
            .when('/search/:keyword', {
                controller: 'SearchController',
                templateUrl: 'app/views/search.html'
            })
            .when('/maps/', {
                controller: 'MapsController',
                templateUrl: 'app/views/maps.html'
            })
            .when('/translate/', {
                controller: 'TranslateController',
                templateUrl: 'app/views/translate.html'
            })
            .otherwise( { redirectTo: '/' });
    });
}());