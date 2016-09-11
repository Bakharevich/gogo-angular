angular.module("gogo")

.controller('IndexCtrl', ['$rootScope', '$scope', '$http', '$routeParams', '$cookies', '$location', '$sce', 'toastr',
                  function($rootScope, $scope, $http, $routeParams, $cookies, $location, $sce, toastr) {
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

    if ($cookies.get('themeId')) {
        $scope.themeId = $cookies.get('themeId');
    }
    else {
        $scope.themeId = 1;
    }

    $rootScope.title = "GoGo.by - поисковая система Беларуси"
    $rootScope.themeId = $scope.themeId;


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
        [ 1, 'img/themes/1/bg-popup-choose-theme.jpg', 'Стандартная' ],
        [ 2, 'img/themes/2/bg-popup-choose-theme.jpg', 'Дерево' ],
        [ 3, 'img/themes/3/bg-popup-choose-theme.jpg', 'Полотно' ],
        [ 4, 'img/themes/4/bg-popup-choose-theme.jpg', 'Материал' ],
        [ 5, 'img/themes/5/bg-popup-choose-theme.jpg', 'Квартира' ],
        [ 6, 'img/themes/6/bg-popup-choose-theme.jpg', 'Жыве Беларусь!' ],
    ];

    $scope.onSelect = function($item, $model, $callback, request) {
        $scope.searchRequest(request);
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
    };

    $scope.saveTheme = function(themeId) {
        if (!themeId) return false;

        var now = new Date(),
            exp = new Date(now.getFullYear(), now.getMonth()+2, now.getDate());

        $cookies.put('themeId', themeId, {'expires': exp});

        $scope.themeId = themeId;
        $rootScope.themeId = $scope.themeId;

        $scope.setTheme(themeId);

        $('#chooseBackground').modal('hide');

        toastr.success(
            'Новая тема оформления установлена',
            '',
            {closeButton: true}
        );
    };

    $scope.setTheme = function(themeId) {
        $scope.srcLogo = "img/themes/" + $scope.themeId + "/logo.png";
    }
    $scope.setTheme($scope.themeId);

    $scope.selectTheme = function(themeId) {
        $scope.themeSelected = themeId;
    }

    $scope.isThemeSelected = function(themeId) {
        return $scope.themeSelected === themeId;
    }

    //$('body').css('background-color', '#999');
    //$('body').css('background-image', 'url(/img/main_bg.png)');
}]);