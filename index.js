var _ = require("underscore");
GLOBAL.coreConfig = require('./lib/config/core-config');
var publicMethod = {
    services: {
        abstractFacade      : require('./lib/services/facade/abstract-facade'),
        logger              : require('./lib/services/logger/logUdp'),
        localeResolver      : require('./lib/services/locale/locale-resolver'),
        validate            : require('./lib/services/validation/index')
    },
    utils: {
        slugify             : require('./lib/utils/slugify'),
        i18n                : require('./lib/utils/i18n'),
        handlebarsHelpers   : require('./lib/utils/handlebarsHelpers'),
        is                  : require('./lib/utils/is'),
        xCrypt              : require('./lib/utils/x-crypt')
    },
    exceptions: {
        defaultError        : require("./lib/exceptions/defaultError")
    },
    models                  : require('./lib/models/models'),
    controllerFilters       : require('./lib/resources/properties/controller-filters'),
    config                  : coreConfig,
    endpoints               : require('./lib/resources/end-points'),
    middlewares             : require('./lib/middlewares/middlewares')
};

module.exports = publicMethod;