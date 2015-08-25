/**
 *
 * @type {{all: string, detail: string}}
 */
var coreConfig = require('../../config/core-config');

exports.destinations = {
  landing                       : { method:'get', path: '/:section(destinos|destinations)' },
  continent                     : { method:'get', path: '/:section(destinos|destinations)/:continentId-:continentName' },

  apiSearchContinents           : { method:'get', path: coreConfig.api.basePath + '/continents?limit=:limit'},
  apiSearchContinent            : { method:'get', path: coreConfig.api.basePath + '/continents/:continentId' },
  apiSearchCountries            : { method:'get', path: coreConfig.api.basePath + '/countries?limit=:limit' },
  apiSearchCountriesByContinent : { method:'get', path: coreConfig.api.basePath + '/continents/:id/countries?limit=:limit' },
  apiSearchTopCountriesByCountry: { method:'get', path: coreConfig.api.basePath + '/countries/:countryId/ranking?limit=:limit' },
  apiSearchCities               : { method:'get', path: coreConfig.api.basePath + '/cities?limit=:limit' },
  apiSearchCity                 : { method:'get', path: coreConfig.api.basePath + '/cities/:cityId' },
  apiSearchCitiesByCountry      : { method:'get', path: coreConfig.api.basePath + '/countries/:countryId/cities?limit=:limit' },
  apiSearchTopCitiesByCountry   : { method:'get', path: coreConfig.api.basePath + '/countries/:countryId/cities/ranking?limit=:limit' },
  apiSearchTopCountriesByContinent: { method:'get', path: coreConfig.api.basePath + '/continents/:id/countries/ranking?limit=:limit' },
  apiSearchCountry              : { method:'get', path: coreConfig.api.basePath + '/countries/:id' },
	apiGetGeoDestination          : { method:'get', path: coreConfig.api.basePath + '/destinations/:id?limit=:limit'},
	apiNewDestinations            : { method:'put', path: coreConfig.api.basePath + '/destinations/:id'},
	phpNewDestinations            : { method:'post', path: coreConfig.viajeros.basePath + '/admin/create-destinations.html'}
}

