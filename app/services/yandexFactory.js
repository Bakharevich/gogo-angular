(function(){
    var yandexFactory = function($http) {
        var factory = {};

        factory.getResults = function() {
            return 'Yandex results';
        };

        return factory;
    };

    yandexFactory.$inject = ['$http'];

    angular.module('myApp').factory('yandexFactory', yandexFactory);
}());