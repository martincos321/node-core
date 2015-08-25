var qs = require("querystring");
var os = require('os');
var Q = require('q');

//Services
var abstractFacade = require('../services/facade/abstract-facade');
//Models
var models = require('../models/models');
var request = models.request;
//Endpoints
var endpoints = require('../resources/end-points');
var cache_manager = require('cache-manager');
var redis = require('../utils/redis_store');

var goroMiddleware = function (req, res, next) {

    var goroCache = cache_manager.caching({store: redis, db: 0, ttl: 86400 * 30});
    var goroKey   = "goroBackup:"+ req.domainResolved.lang + ":" + req.domainResolved.country;

    var goroParams = {
        type: "goro",
        method: 'components',
        search: new models['goro-search'](req.domainResolved),
        apiResponse: models['goro-response'],
        model: models.goro,
        endpoint: endpoints.goro.components
    };

    var nibblerParams = {
        type: "goro",
        method: 'nibbler',
        search: new models['goro-search'](req.domainResolved),
        apiResponse: models['goro-response'],
        model: models.goro,
        endpoint: endpoints.goro.nibbler
    };

    var promises = [ abstractFacade().get(new request(goroParams, req)), abstractFacade().get(new request(nibblerParams, req)) ];
    
    Q.all(promises).then(function(response){

        var resheaders =  response[0].headers;
        if(resheaders["set-cookie"]){
            for(var i=0;i<resheaders["set-cookie"].length;i++){
                var cookieArray =  resheaders["set-cookie"][i].split(';');
                res.cookie(cookieArray[0].split('=')[0], cookieArray[0].split('=')[1], {httpOnly: false});
            }
        }

        goroCache.wrap(goroKey, function (cache_callback) {

            cache_callback(null, response);

        }, function (err, data) {});


        req.goroComponents = response[0].data[0];
        req.goroComponents.nibbler = response[1].data[0].nibbler;
        next();
        
    }, function(error){

        goroCache.get(goroKey, function(err, result) {
            if(!err){
                logger.error("goro-middleware:goro from redis", error.extraInfo);

                req.goroComponents = result[0].data[0];
                req.goroComponents.nibbler = result[1].data[0].nibbler;
                next();
            }else{
                logger.error("goro-middleware:goro redis and server error", err);
                req.error = error;
                res.render('500', req);
            }

        });


    });
};

module.exports = goroMiddleware;