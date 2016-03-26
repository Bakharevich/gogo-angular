angular.module("gogo")

.controller('SigninCtrl', ['$scope', '$http', 'toastr', '$location', 'Global', function($scope, $http, toastr, $location, Global) {
    $scope.runSignin = function()
    {
        $http.put('/slim/users/signin', {
            email: $scope.email,
            password: $scope.password
        })
        .then(function onSuccess(response) {
            $scope.user = response.data.data;

            toastr.success(
                response.data.status.message,
                'Success',
                {closeButton: true}
            );

            $location.path('/');
        })
        .catch(function onError(err) {
            if (err.status == 400 || 404) {
                toastr.error(
                    'Invalid credentials',
                    'Error',
                    {closeButton: true}
                );
                return;
            }

            toastr.error(
                'An error has occured',
                'Error',
                {closeButton: true}
            );
            return;
        });
    }

    // get info
    if (!$scope.user) {
        $http.get('/slim/users/me', {

        })
            .then(function onSuccess(response) {
                $scope.user = response.data.data;

                $location.path('/');
            })
            .catch(function onError(err) {

            });
    }
}]);