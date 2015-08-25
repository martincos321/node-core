var _ = require('underscore');
var config = {};
GLOBAL.redis_store = require('../../utils/redis_store');

_.extend(config,
    require('./modules/articles-cache'),
    require('./modules/destinations-cache'),
    require('./modules/goro-cache'),
    require('./modules/countries-cache'),
    require('./modules/topCountries-cache'),
    require('./modules/geoLocalization-cache'),
    require('./modules/configurator-cache'),
    require('./modules/users-cache')
);
module.exports = config;