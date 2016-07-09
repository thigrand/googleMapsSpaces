function apiConnector($q, $http) {
"use strict";
    function fetchData(path) {
        return $q(function(resolve, reject) {
            $http.get(path, {
                    'accept': 'application/json, text/plain, /*'
                })
                .then(function(data) {
                    resolve(data);
                }, function(err) {
                    reject(err);
                    console.error("err", err);
                });
        });
    }
    return {
        fetchData: fetchData
    };
}
angular.module('maps').factory('apiConnector', ['$q', '$http', apiConnector]);
