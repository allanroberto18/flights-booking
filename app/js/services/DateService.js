(function () {
    'use strict';

    angular.module('app').service('DateService', DateService);

    function DateService() {
        this.format = function (param) {
            if (param === '') {
                throw 'The parameter is undefined or null';
            }

            var year = param.getFullYear();
            var mouth = '';
            var day = '';

            return param.toISOString().substr(0, 10).split('/').reverse().join('-');
        }
    }
})();
