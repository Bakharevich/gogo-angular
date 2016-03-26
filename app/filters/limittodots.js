angular.module('gogo').filter('limitToDots', function(limitToFilter) {
    return function(text, limit) {
        if (text.length >= limit) {
            return limitToFilter(text, limit) + '...';
        }
        else {
            return limitToFilter(text, limit);
        }
    }
});