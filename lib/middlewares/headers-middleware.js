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

var headersMiddleware = function (req, res, next) {


    req.passFowardHeaders = {};
    var cookies = [];
    for(var cookie in req.cookies){
        if(cookie.indexOf("X-ABT") > -1){
            cookies.push(cookie+'='+req.cookies[cookie]);
        }

        if(cookie.indexOf("X-Version-Override") > -1){
            req.passFowardHeaders["X-Version-Override"] = req.cookies[cookie];
        }
    }
    for(var headers in req.headers){
        if(headers.indexOf("x-abt") > -1){
            cookies.push(headers.toUpperCase()+'='+req.headers[headers].toUpperCase());
        }
        if(headers.indexOf("x-version-override") > -1){
            req.passFowardHeaders["x-version-override"] = req.headers[headers];
        }
        if(headers.indexOf("x-forwarded-for") > -1){
            req.passFowardHeaders["x-forwarded-for"] = req.headers[headers];
        }
        if(headers.indexOf("X-UOW") > -1 || headers.indexOf("x-uow") > -1 ){
            req.passFowardHeaders["X-UOW"] = req.headers[headers];
            res.setHeader("X-UOW", req.headers[headers]);
        }
    }

    req.passFowardHeaders.Cookie = 'X-VJR-AllowedUser=true;'+cookies.join(";");
    req.commons = config.commons;
    req.config = config;
    req.enviroment = process.env.NODE_ENV;
    res.setHeader('Server', os.hostname());

    next();

};

module.exports = headersMiddleware;
