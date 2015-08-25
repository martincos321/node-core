/**
 *
 * @type {{all: string, detail: string}}
 */

var coreConfig = require('../../config/core-config');

exports.metasearcher = {
    themed_landing: { method: 'get', path: "^/reservas/:theme"},

    widget_themed_destinations: { method: 'get', path: "^/widget/themed_destinations"},
    widget_themed_destinations_ext: { method: 'get', path: coreConfig.metasearcher.basePath + "/widget/themed_destinations"},
    widget_offers: { method: 'get', path: "^/widget_offers/:ids/:lang/:clientIp"},

    api_search: { method:'get', path: coreConfig.hotels.basePath + "/api/hSearch/?action=searchHotels&providers=hotelsDespegar&tid=:tid" },
    get_hotels: { method:'get', path: '^/:section(hotels|hoteles|hoteis)/s/:destinationId([0-9]{1,8})/:checkin([0-9]{4}-[0-9]{2}-[0-9]{2})/:checkout([0-9]{4}-[0-9]{2}-[0-9]{2})/:guests(*)(/)?$' },
    get_flights_oneway: { method:'get', path: '^/:section(flights|vuelos)/s/:trip(oneway)/:going([A-Z]{3})/:back([A-Z]{3})/:checkin([0-9]{4}-[0-9]{2}-[0-9]{2})/:passengers(*)$' },
    get_flights_roundtrip: { method:'get', path: '^/:section(flights|vuelos)/s/:trip(roundtrip)/:going([A-Z]{3})/:back([A-Z]{3})/:checkin([0-9]{4}-[0-9]{2}-[0-9]{2})/:checkout([0-9]{4}-[0-9]{2}-[0-9]{2})/:passengers(*)$' },
    
    //public reserves
    get_reservations_landing: { method:'get', path: '^/:section(reservas|reserves)(/)?$' },
    get_reservations_getHotels: { method:'get', path: '^/:section(reservas|reserves)/getHotels$' },
    get_reservations_getTopCities: { method:'get', path: '^/:section(reservas|reserves)/getTopCities$' },
    get_reservations_getFlights: { method:'get', path: '^/:section(reservas|reserves)/getFlights$' },
    get_reservations_getPackages: { method:'get', path: '^/:section(reservas|reserves)/getPackages$' },
    get_reservations_getStarred: { method:'get', path: '^/:section(reservas|reserves)/getStarred$' },

    //Api Reservers
    get_reservations_hotels: { method:'get', path: coreConfig.api.basePath+'/bookings/hotels?country=:idCountry&ip=:clientIp&id=:upaId' },
    get_reservations_flights: { method:'get', path: coreConfig.api.basePath+'/bookings/flights?country=:idCountry&ip=:clientIp&id=:upaId' },
    get_reservations_starred: { method:'get', path: coreConfig.api.basePath+'/bookings/flights/starred?country=:idCountry&ip=:clientIp&id=:upaId' },
    get_reservations_packages: { method:'get', path: coreConfig.api.basePath+'/bookings/closed_packages?country=:idCountry&ip=:clientIp&id=:upaId' },

    get_offers_hotels: { method:'get', path: coreConfig.api.basePath+'/hotels/offers?country=:idCountry&origin=:origin&destination=:destination&limit=:limit' },
    get_offers_flights: { method:'get', path: coreConfig.api.basePath+'/flights/offers?country=:idCountry&origin=:origin&destination=:destination&limit=:limit' },
}

