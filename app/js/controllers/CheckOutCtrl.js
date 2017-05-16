(function () {
    'use strict';

    angular.module('app').controller('CheckOutCtrl', CheckOutCtrl);

    CheckOutCtrl.$inject = ['ApiFactory', '$routeParams', '$location', '$log'];

    function CheckOutCtrl(ApiFactory, $routeParams, $location, $log) {
        var vm = this;

        vm.title = 'Checkout';
        vm.data = {};
        vm.checkOut = {};
        vm.link = '';
        vm.init = init;
        vm.getCheckOut = getCheckOut;
        vm.back = back;

        function init() {
            if ($routeParams === undefined && $routeParams === {}) {
                $location.path('/');
            }

            vm.origin = $routeParams.origin;
            vm.destiny = $routeParams.destiny;
            vm.link = $routeParams.origin + '/to/' + $routeParams.destiny + '/' + $routeParams.out + '/' + $routeParams.back;

            var result = getCheckOut();

            result
                .then(function (response) {
                    vm.checkOut = response;
                })
            ;
        }

        function getCheckOut() {
            return ApiFactory.checkOut(vm.link).then(function (response) {
                return response;
            });
        }

        function back() {
            return $location.path('/');
        }

        init();
    }
})();