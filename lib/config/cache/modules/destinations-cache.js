var redis = require('../../../utils/redis_store');

module.exports = {
  destinations: {
    apiSearchContinents             : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchContinent              : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchCountries              : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchCountry                : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchTopCountriesByCountry  : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchCities                 : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchCity                   : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchCitiesByCountry        : {store: 'memory', db: 0, ttl: 86400 * 30},
    apiSearchTopCitiesByCountry     : {store: 'memory', db: 0, ttl: 86400 * 30},
	apiSearchGeoProvinces           : {store: redis, db: 0, ttl: 86400 * 30},
	apiSearchGeoCountries           : {store: redis, db: 0, ttl: 86400 * 30},
	apiSearchGeoContinents          : {store: redis, db: 0, ttl: 86400 * 30},
    apiGetGeoDestination            : {store: redis, db: 0, ttl: 86400 * 30}
  }
}
