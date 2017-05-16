(function () {
    'use strict';

    function ConfigApp($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/js/tpl/index.tpl.html",
                controller: 'IndexCtrl as vm'
            })
            .when("/checkout/:origin/:destiny/:out/:back", {
                templateUrl: "/js/tpl/check-out.tpl.html",
                controller: 'CheckOutCtrl as vm'
            })
            .otherwise({redirectTo: '/'});
        ;
    }

    ConfigApp.$inject = ['$routeProvider'];

    angular.module('app', ['ngRoute']).config(ConfigApp);


})();