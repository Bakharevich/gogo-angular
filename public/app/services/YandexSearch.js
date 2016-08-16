angular.module("gogo")

.service('YandexSearch', function($http) {
    var request = {};

    this.setQuery = function(query) {
        request.query = query;
    }

    this.setRegion = function(region) {
        request.region = region;
    }

    this.setPage = function(page) {
        request.page = page;
    }
    
    this.setSort = function(sort) {
        request.sort = sort;
    }
    
    this.getRequestUrl = function() {
        return objectToParams(request);
    }

    this.sendRequest = function() {
        //var res;

        //var requestUrl = this.getRequestUrl();
        //console.log('Request URL ' + requestUrl);


        var result = $http({
            method: 'POST',
            url: '/api/results.php',// + requestUrl,
            params: request

        });
        /*
        .then(function succcessCallback(response) {
            //console.log(response.data);
            res = response.data;
        }, function errorCallback(response) {
            alert("error!");
        });*/

        //var res = results.then(handleSuccess(response), handleError);
        //console.log(res);

        return result.then(handleSuccess, handleError);
    }

    function handleSuccess(response) {
        //console.log(response.data);
        return (response.data);
    }

    function handleError(response) {
        alert('Error');
    }
});