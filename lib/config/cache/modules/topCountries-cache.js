module.exports = {
  topCountries: {
    apiSearchCountriesByContinent   : {store: 'memory', db: 0, ttl: 86400*30},
    apiSearchTopCountriesByContinent: {store: 'memory', db: 0, ttl: 86400*30},
    apiSearchTopCountriesByCountry  : {store: 'memory', db: 0, ttl: 86400*30}
  }
};
