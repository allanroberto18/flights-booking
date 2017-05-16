(function(){
    'use strict';

    angular.module('app').service('FilterService', FilterService);

    function FilterService() {

        this.execFilter = function(list, param) {
            if (param === '')
            {
                throw 'The parameter to filter is undefined or null';
            }

            if (list == null || list.length == 0)
            {
                throw 'The list to filter is undefined or null';
            }

            var result = [];

            for (param in list) {
                if (typeof list[param] !== 'function' && list.hasOwnProperty(param)) {
                    result = list[param];

                    break;
                }
            }
            return result;
        }
    }
})();
