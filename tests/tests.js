describe('Test API', function () {
    var $httpBackend;

    beforeEach(function () {
        inject(function ($injector) {

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Flight List', function () {
        $httpBackend.expectGET('https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/');
    });

    it('Instead to get the list of cheap flights', function () {
        $httpBackend.expectGET('https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/DUB/to/STN/2014-12-02/2015-02-02/250/unique/?limit=15&offset-0');
    });
});

describe('ApiFactory: Factory to get data through API', function () {
    var ApiFactory;

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            ApiFactory = $injector.get('ApiFactory');
        });

        it('Test API\'s prefix', function () {
            expect(ApiFactory.prefix).toEqual('https://murmuring-ocean-10826.herokuapp.com/en/api/2/');
        });

        it('Simulate the promisse of getBookingSelectors', function () {
            var data = ApiFactory.getBookingSelectors().then(function (response) {
                return response;
            });

            expect(data).toBeObject();

            expect(data).toHaveMember('closures');

            expect(data).toHaveMember('routes');

            expect(data).toHaveMember('airports');

            expect(data).toHaveMember('discounts');

            expect(data).toHaveMember('countries');

            expect(data).toHaveMember('messages');

        });
    });
});

describe('Service to filter objects', function () {
    var FilterService, obj, param;

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            FilterService = $injector.get('FilterService');

            obj = {
                one: ['one', 'ten', 'eleven'],
                two: ['two', 'twelve', 'twenty'],
                three: ['three', 'thirteen', 'thirty']
            };
        });
    });

    it('Return object by key of array', function () {
        param = 'one';

        var testResult = ['one', 'ten', 'eleven'];

        result = FilterService.execFilter(obj, param);

        expect(obj).toBeObject();

        expect(result).toBeArray();

        expect(result).toEqual(testResult);
    });
});

describe('Simple Date Format', function () {
    var DateService, result, d, check;

    exceptionHandler = {};

    exceptionHandler.fn = function (exception, cause) {
        throw exception;
    };

    beforeEach(function () {
        module('app', function ($provide) {
            $provide.factory('$exceptionHandler', function () {
                return function (exception, cause) {
                    return exceptionHandler.fn(exception, cause);
                };
            });
        });

        inject(function ($injector) {
            DateService = $injector.get('DateService');
        });

        check = false;
    });

    it('Return date formated', function () {
        result = DateService.format(new Date('2017-05-15'));

        expect(result).toEqual('2017-05-15');
    });
});

describe('Test AppConfig', function () {
    beforeEach(function () {
        module('app');
    });

    it('Check ', function () {
        inject(function ($route) {
            expect($route.routes['/'].controller).toBe('IndexCtrl as vm');
            expect($route.routes['/'].templateUrl).toEqual('/js/tpl/index.tpl.html');

            expect($route.routes['/checkout/:origin/:destiny/:out/:back'].controller).toBe('CheckOutCtrl as vm');
            expect($route.routes['/checkout/:origin/:destiny/:out/:back'].templateUrl).toEqual('/js/tpl/check-out.tpl.html');

            expect($route.routes[null].redirectTo).toEqual('/');
        });
    });
});

describe('IndexCtrl', function () {
    var $controller, ctrl, DateService;

    beforeEach(function () {
        module('app');

        inject(function (_$controller_, $injector) {
            $controller = _$controller_;

            DateService = $injector.get('DateService');
        });

        ctrl = $controller('IndexCtrl', {});
    });

    it('Defined controller', function () {
        expect(ctrl).toBeDefined();
    });

    it('Undefined variables', function () {
        expect(ctrl.routes).toBeUndefined();

        expect(ctrl.discounts).toBeUndefined();

        expect(ctrl.messages).toBeUndefined();

        expect(ctrl.airports).toBeUndefined();

        expect(ctrl.countries).toBeUndefined();
    });

    it('Test first title', function () {
        expect(ctrl.title).toEqual('Plan your travel');
    });

    it('Fill vars with loadData', function () {
        ctrl.loadData().then(function (response) {
            expect(response.routes).toBeObject();
            expect(response.airports).toBeArrayOfObjects();
            expect(response.discounts).toBeObject();
            expect(response.countries).toBeArrayOfObjects();
            expect(response.messages).toBeObject();
        });
    });

    it('Select about origin', function () {
        var code = 'es';
        var airportsOrigin, routesOrigin, airportsDestiny;

        ctrl.countries = [
            {
                code: 'at',
                name: 'Austria',
                seoName: 'austria',
                englishSeoName: 'austria',
                currency: 'EUR',
                url: 'austria'
            },
            {
                code: 'be',
                name: 'Belgium',
                seoName: 'belgium',
                englishSeoName: 'belgium',
                currency: 'EUR',
                url: 'belgium'
            },
            {
                code: 'bg',
                name: 'Bulgaria',
                seoName: 'bulgaria',
                englishSeoName: 'bulgaria',
                currency: 'EUR',
                url: 'bulgaria'
            },
            {
                code: 'hr',
                name: 'Croatia',
                seoName: 'croatia',
                englishSeoName: 'croatia',
                currency: 'EUR',
                url: 'croatia'
            },
            {
                code: 'cy',
                name: 'Cyprus',
                seoName: 'cyprus',
                englishSeoName: 'cyprus',
                currency: 'EUR',
                url: 'cyprus'
            },
            {
                code: 'dk',
                name: 'Denmark',
                seoName: 'denmark',
                englishSeoName: 'denmark',
                currency: 'DKK',
                url: 'denmark'
            },
            {
                code: 'es',
                name: 'Spain',
                seoName: 'spain',
                englishSeoName: 'spain',
                currency: 'EUR',
                url: 'spain'
            }
        ];
        ctrl.airports = [
            {
                iataCode: 'AAR',
                name: 'Aarhus',
                base: false,
                latitude: 56.3,
                longitude: 10.619,
                country: {
                    code: 'dk',
                    name: 'Denmark',
                    seoName: 'denmark',
                    englishSeoName: 'denmark',
                    currency: 'DKK',
                    url: 'denmark'
                }
            },
            {
                iataCode: 'AGA',
                name: 'Agadir',
                base: false,
                latitude: 30.325,
                longitude: -9.41307,
                country: {
                    code: 'ma',
                    name: 'Morocco',
                    seoName: 'morocco',
                    englishSeoName: 'morocco',
                    currency: 'MAD',
                    url: 'morocco'
                }
            },
            {
                iataCode: 'AHO',
                name: 'Alghero',
                base: true,
                latitude: 40.6321,
                longitude: 8.29077,
                country: {
                    code: 'it',
                    name: 'Italy',
                    seoName: 'italy',
                    englishSeoName: 'italy',
                    currency: 'EUR',
                    url: 'italy'
                }
            },
            {
                iataCode: 'ALC',
                name: 'Alicante',
                base: true,
                latitude: 38.2822,
                longitude: -0.558156,
                country: {
                    code: 'es',
                    name: 'Spain',
                    seoName: 'spain',
                    englishSeoName: 'spain',
                    currency: 'EUR',
                    url: 'spain'
                }
            },
            {
                iataCode: 'LEI',
                name: 'Almeria',
                base: false,
                latitude: 36.8439,
                longitude: -2.3701,
                country: {
                    code: 'es',
                    name: 'Spain',
                    seoName: 'spain',
                    englishSeoName: 'spain',
                    currency: 'EUR',
                    url: 'spain'
                }
            },
            {
                iataCode: 'AMS',
                name: 'Amsterdam',
                base: false,
                latitude: 52.3105,
                longitude: 4.76827,
                country: {
                    code: 'nl',
                    name: 'Netherlands',
                    seoName: 'netherlands',
                    englishSeoName: 'netherlands',
                    currency: 'EUR',
                    url: 'netherlands'
                }
            },
            {
                iataCode: 'AOI',
                name: 'Ancona',
                base: false,
                latitude: 43.6163,
                longitude: 13.3623,
                country: {
                    code: 'it',
                    name: 'Italy',
                    seoName: 'italy',
                    englishSeoName: 'italy',
                    currency: 'EUR',
                    url: 'italy'
                }
            },
            {
                iataCode: 'ATH',
                name: 'Athens',
                base: true,
                latitude: 37.9364,
                longitude: 23.9445,
                country: {
                    code: 'gr',
                    name: 'Greece',
                    seoName: 'greece',
                    englishSeoName: 'greece',
                    currency: 'EUR',
                    url: 'greece'
                }
            },
            {
                iataCode: 'FKB',
                name: 'Baden-Baden',
                base: true,
                latitude: 48.7794,
                longitude: 8.0805,
                country: {
                    code: 'de',
                    name: 'Germany',
                    seoName: 'germany',
                    englishSeoName: 'germany',
                    currency: 'EUR',
                    url: 'germany'
                }
            },
            {
                iataCode: 'BCN',
                name: 'Barcelona El Prat',
                base: true,
                latitude: 41.2971,
                longitude: 2.07846,
                country: {
                    code: 'es',
                    name: 'Spain',
                    seoName: 'spain',
                    englishSeoName: 'spain',
                    currency: 'EUR',
                    url: 'spain'
                }
            },
            {
                iataCode: 'BRI',
                name: 'Bari',
                base: true,
                latitude: 41.1389,
                longitude: 16.7606,
                country: {
                    code: 'it',
                    name: 'Italy',
                    seoName: 'italy',
                    englishSeoName: 'italy',
                    currency: 'EUR',
                    url: 'italy'
                }
            }
        ];
        ctrl.routes = {
            BCN: ['FKB', 'ATH']
        };

        airportsDestiny = [
            {
                iataCode: 'FKB',
                name: 'Baden-Baden',
                base: true,
                latitude: 48.7794,
                longitude: 8.0805,
                country: {
                    code: 'de',
                    name: 'Germany',
                    seoName: 'germany',
                    englishSeoName: 'germany',
                    currency: 'EUR',
                    url: 'germany'
                }
            },
            {
                iataCode: 'ATH',
                name: 'Athens',
                base: true,
                latitude: 37.9364,
                longitude: 23.9445,
                country: {
                    code: 'gr',
                    name: 'Greece',
                    seoName: 'greece',
                    englishSeoName: 'greece',
                    currency: 'EUR',
                    url: 'greece'
                }
            }
        ]

        // Select origin country
        ctrl.countryOrigin = ctrl.selectCountry(code);
        expect(ctrl.countryOrigin.name).toEqual('Spain');

        // Select airports of origin
        airportsOrigin = ctrl.selectAirportsByCountry(code);
        expect(airportsOrigin).toBeArrayOfObjects();
        expect(airportsOrigin.length).toEqual(3);

        ctrl.getAirportsOrigin(code);
        expect(ctrl.airportsOrigin).toBeArrayOfObjects();
        expect(ctrl.airportsOrigin).toEqual(airportsOrigin);

        // Select routes available
        routesOrigin = ctrl.selectRoutesByAirport('BCN');
        expect(routesOrigin).toBeArray();
        expect(routesOrigin.length).toEqual(2);

        ctrl.getRoutesOrigin('BCN');
        expect(ctrl.routesOrigin).toBeArrayOfObjects();
        expect(ctrl.routesOrigin).toEqual(airportsDestiny);
    });

    it('Test setDestiny', function () {
        var destiny = 'BFS';

        ctrl.setDestiny(destiny);

        expect(ctrl.destiny).toEqual(destiny);

        expect(ctrl.link).toEqual('/checkout//BFS/' + DateService.format(new Date) + '/' + DateService.format(new Date));

        ctrl.airportOrigin = 'SOF';

        ctrl.setDestiny(destiny);

        expect(ctrl.link).toEqual('/checkout/SOF/BFS/' + DateService.format(new Date) + '/' + DateService.format(new Date));
    });
});