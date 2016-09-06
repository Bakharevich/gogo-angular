angular.module("gogo")

.controller('MapsCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

    //создаем массив координат и данных для меток и балунов
    $scope.markers = [
        {coordinates:[56.56, 38.63], properties: {balloonContent: 'Здесь рыбы нет!'}},
        {coordinates:[55.16, 39.89], properties: {balloonContent: 'Здесь рыбы тоже нет'}, options: {preset: 'islands#icon', iconColor: '#a5260a'}},
        {coordinates:[55.08, 38.96], properties: {balloonContent: 'А здесь есть!'}}
    ];

    //настройки положения карты
    $scope.map = {
        center: [55.55, 39.84], zoom: 12
    };

    // get info
    if (!$scope.user) {
        $http.get('/slim/users/me', {

        })
            .then(function onSuccess(response) {
                $scope.user = response.data.data;

                //$location.path('/');
            })
            .catch(function onError(err) {

            });
    }

    $rootScope.title = 'Карта';
}]);