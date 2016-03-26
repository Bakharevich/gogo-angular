angular.module("gogo")

.controller('SignoutCtrl', ['$scope', '$http', 'toastr', '$location', function($scope, $http, toastr, $location) {
    $http.get('/slim/users/signout', {
        // no params
    })
    .then(function onSuccess(response) {
        if (response.data.status.error == true) {
            toastr.error(
                response.data.status.message,
                'Error',
                {closeButton: true}
            );
        }
        else {
            toastr.success(
                response.data.status.message,
                'Success',
                {closeButton: true}
            );

            $scope.user = false;

            $location.path('/');
        }
    })
    .catch(function onError(err) {
        console.log(err);
    });
}]);