(function(){
    'use strict';

    angular.module('app').service('CountObjectService', CountObjectService);

    function CountObjectService() {
        this.total = function(list) {
            var result = 0;
            for (var prop in list) {
                if (list.hasOwnProperty(prop)) {
                    result++;
                }
            }
            return result;
        }
    }
})();
