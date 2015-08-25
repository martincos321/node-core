var qs              = require("querystring");
var os              = require('os');
var _               = require('underscore');

//Services
var abstractFacade  = require('../services/facade/abstract-facade');
//Models
var models          = require('../models/models');
var request         = models.request;
//Endpoints
var endpoints       = require('../resources/end-points');

var configuratorMiddleware = function (req, res, next) {
    var configuratorParams = {
        type: 'configurator',
        method: 'getConfiguration',
        apiResponse: models['configurator-response'],
        model: models.configurator,
        endpoint: endpoints.configurator.getConfiguration
    };

    req.config = config;

    abstractFacade().get(new request(configuratorParams, req)).then(function(response){
        req.configurator = response.data[0];
        next();
    }, function(error){
        logger.error("configurator-middleware:configuration injections", error.extraInfo);
        req.error = error;
        next();
    });
};

module.exports = configuratorMiddleware;