angular.module("gogo")

.controller('SignupCtrl', ['$scope', '$http', 'toastr', '$location', function($scope, $http, toastr, $location) {

    $scope.runSignup = function()
    {
        console.log('Sign up ' + $scope.name);

        $http.post('/slim/users', {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
            password2: $scope.password2
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
                $scope.user = response.data.data;
                toastr.success(
                    response.data.status.message,
                    'Success',
                    {closeButton: true}
                );

                $location.path('/');
            }
        })
        .catch(function onError(err) {
            console.log(err);
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