angular.module("gogo")

.controller('TranslateCtrl', ['$scope', '$http', '$routeParams', '$location', '$compile', '$log', function($scope, $http, $routeParams, $location, $compile, $log) {
    var word = $routeParams.word;
    var word_decoded = window.decodeURIComponent(word);
    $scope.word = word_decoded;

    // send request
    if (!$scope.langs) {
        $http.get('/slim/translate/getlangs').success(function (data) {
            $scope.langs = data.data;
            //$scope.from = $scope.
            //console.log($scope);
        });
    }
    else {
        console.log('Langs exist');
    }

    console.log($scope.langs);

    // send request
    $scope.translate = function() {
        var from = $scope.from;
        var to = $scope.to;
        var phrase = $scope.phrase;

        var phrase_encoded = window.encodeURIComponent(phrase);

        if (phrase) {
            $http.get('/slim/translate/translate?from=' + from + '&to=' + to + '&text=' + phrase_encoded).success(function(data) {
                $scope.result = data.data.text;
                console.log(data.data);
            });
        }
        else {
            //alert('Type the phrase to translate');
        }
    }

    $scope.reverse = function() {
        var from = $scope.from;
        var to = $scope.to;

        console.log('From:' + from + ', To:' + to);

        $scope.from = to;
        $scope.to = from;

        $scope.translate();
    }

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
}]);