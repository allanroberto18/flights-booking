(function () {
    'use strict';

    angular.module('app').controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['ApiFactory', 'FilterService', 'DateService', '$location', '$log'];

    function IndexCtrl(ApiFactory, FilterService, DateService, $location, $log) {
        var vm = this;

        vm.title = 'Plan your travel';

        vm.out = new Date();
        vm.back = new Date();
        vm.link = '';

        vm.init = init;
        vm.loadData = loadData;
        vm.selectCountry = selectCountry;
        vm.getAirportsOrigin = getAirportsOrigin;
        vm.selectAirportsByCountry = selectAirportsByCountry;
        vm.getRoutesOrigin = getRoutesOrigin;
        vm.selectRoutesByAirport = selectRoutesByAirport;
        vm.setDestiny = setDestiny;
        vm.go = go;

        init();

        function init() {
            vm.airportOrigin = '';
            vm.destiny = '';

            var data = loadData();

            data
                .then(function (response) {
                    vm.routes = response.routes;

                    vm.discounts = response.discounts;

                    vm.messages = response.messages;

                    vm.airports = response.airports;

                    vm.countries = response.countries;
                })
            ;
        }

        function loadData() {
            return ApiFactory.getBookingSelectors().then(function (response) {
                return response;
            });
        }

        function selectCountry(code) {
            var data = vm.countries.filter(function (i) {
                if (i.code === code) {
                    return i;
                }
            });

            return data[0];
        }

        function selectAirportsByCountry(code) {
            return vm.airports.filter(function (i) {
                return (i.country.code === code);
            });
        }

        function getAirportsOrigin(code) {
            vm.airportsOrigin = [];
            vm.routesOrigin = [];
            vm.link = '';

            vm.airportsOrigin = selectAirportsByCountry(code);
        }

        function selectRoutesByAirport(code) {
            return FilterService.execFilter(vm.routes, code);
        }

        function getRoutesOrigin(code) {
            vm.routesOrigin = [];
            vm.link = '';

            var data = selectRoutesByAirport(code);

            var i = 0;
            vm.routesOrigin = [];
            while (i < data.length) {
                var item = vm.airports.filter(function (airport) {
                    if (airport.iataCode === data[i]) {
                        return airport;
                    }
                });
                vm.routesOrigin.push(item[0]);
                i++;
            }
        }

        function setDestiny(value) {
            vm.destiny = value;

            vm.link = '/checkout/' + vm.airportOrigin + '/' + vm.destiny + '/'
                        + DateService.format(vm.out) + '/' + DateService.format(vm.back);
        }

        function go() {
            $location.path(vm.link);
        }
    }
})();
