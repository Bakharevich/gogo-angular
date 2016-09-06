angular.module("gogo")

.controller('IndexCtrl', ['$rootScope', '$scope', '$http', '$routeParams', '$location', '$sce', 'toastr',  function($rootScope, $scope, $http, $routeParams, $location, $sce, toastr) {
    // send request
    $scope.searchRequest = function(request) {
        request.page = 1;
        request.region = 157;
        request.sort = 'rlv';

        if (request.query) {
            $location.path('/search/').search(request);
        }
        else {
            alert('Введите поисковой запрос');
        }
    }

    $scope.onSelect = function($item, $model, $callback, request) {
        $scope.searchRequest(request);
    }

    $rootScope.title = "GoGo.by - поисковая система Беларуси"


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

    $scope.themes = [
        [ 1, 'img/themes/01.jpg', 'Стандартная' ],
        [ 2, 'img/themes/02.jpg', 'Дерево' ],
        [ 3, 'img/themes/03.jpg', 'Полотно' ],
        [ 4, 'img/themes/04.jpg', 'Материал' ],
        [ 5, 'img/themes/05.jpg', 'Квартира' ],
        [ 6, 'img/themes/06.jpg', 'Жыве Беларусь!' ],
    ];


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

    $scope.setTheme = function(themeId) {
        $scope.themeSelected = themeId;
    }

    $scope.isThemeSelected = function(themeId) {
        return $scope.themeSelected === themeId;
    }

    //$('body').css('background-color', '#999');
    $('body').css('background-image', 'url(/img/main_bg.png)');
}]);