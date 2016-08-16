angular.module("gogo")

.service('Global', function() {
    var user;

    this.set = function(data) {
        alert('Set user:' +data);
        user = data;
    }

    this.get = function() {
        alert('Get user: ' + user);
        return user;
    }
});