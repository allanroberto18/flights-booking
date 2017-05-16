(function () {
    'use strict';

    angular.module('app').factory('ApiFactory', ApiFactory);

    ApiFactory.$inject = ['$http', '$q'];

    function ApiFactory($http, $q) {
        var prefix = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/';

        function requestDataByLink(link) {
            var defer = $q.defer();

            $http.get(link)
                .then(function (response) {
                    defer.resolve(response.data);
                })
                .catch(function (error) {
                    defer.reject(error);
                })
            ;
            return defer.promise;
        }

        function getBookingSelectors() {
            var link = prefix + 'forms/flight-booking-selector/';

            return requestDataByLink(link);
        }

        function checkOut(checkout) {
            var link = prefix + 'flights/from/' + checkout + '/250/unique/?limit=15&offset-0';

            return requestDataByLink(link);
        }

        return {
            prefix: prefix,
            checkOut: checkOut,
            getBookingSelectors: getBookingSelectors
        };
    }
})();
