(function(){
    var MainController = function($scope) {
        //alert('Main controller');
    };

    MainController.$inject = ['$scope'];

    angular.module('myApp').controller('MainController', MainController);
}());