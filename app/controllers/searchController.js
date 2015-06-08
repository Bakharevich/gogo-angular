(function(){
    var SearchController = function($scope, yandexFactory) {
        $scope.doSearch = function(keyword) {
            $scope.results = yandexFactory.getResults(keyword);
        };

        $scope.doSearch('111');
    };

    SearchController.$inject = ['$scope', 'yandexFactory'];

    angular.module('myApp').controller('SearchController', SearchController);
}());