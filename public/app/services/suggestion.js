angular.module("gogo")

.service('Suggestion', function($http) {
    var query = '';
    
    this.setQuery = function(q)
    {
        query = q;
    }
    
    this.getSuggestion = function(val) {
        return $http.get('/api/suggest.php', {
            params: {
                query: query
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item;
            });
        });
    }

    this.test
});