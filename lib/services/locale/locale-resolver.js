//Utils
var Q = require('q');
var _ = require('underscore');
var utils = require("../../utils/utils");
//Services
var abstractFacade = require('../facade/abstract-facade');
//Models
var models = require('../../models/models');
var request = models.request;
//Endpoints
var endpoints = require('../../resources/end-points');
//Properties
var domains = require("../../resources/properties/domain-properties");
var qs = require("querystring");





var localeResolver = function (res, ipAddr) {
  var domain = utils.clone(domains[0]);
  domain.clientIp = ipAddr;
  var deferred = Q.defer();
  var url = res.req.headers.host + "?" + qs.stringify(res.req.query);
  var domainByQuery = getDomainByQuery(res.req.query);
  var currentDomain = getDomainByUrl();

    if(domainByQuery){
        deferred.resolve(domainByQuery);
    }else if(currentDomain){
        deferred.resolve(currentDomain);
    }else{
        getDomainByGeo();
    }

    function getDomainByQuery(query){

        var lang = (query.locale)? query.locale.split("_")[0] : query.lang;
        var country = (query.locale && query.locale.indexOf("_") > -1)? query.locale.split("_")[1] : query.country;
        if(!lang && !country)
            return false;

        var locale =  lang + "_" + country;

        for(var i=0; i < domains.length; i++ ){
            if(domains[i].locale == locale)
                return domains[i];
        }

        return false;
    }


    function getDomainByUrl(){
        for (var i = 0; i < domains.length; i++) {
            var oDomain = domains[i];
            if (url.match(oDomain.pattern)) {
                return oDomain;
            }
        }
        return false;
    }

    function getDomainByGeo(){
        if(res.req.cookies["vjf-geoLocation"]){
            var domainCookie = JSON.parse(res.req.cookies["vjf-geoLocation"]);
            deferred.resolve(getDomain(domainCookie.id, domainCookie.iataCode));
        }else{

            abstractFacade().get(new request({
                type: 'geoLocalization',
                method: 'geoLocalizationByIP',
                search: new models['geoLocalization-search']({ipAddress: ipAddr}),
                apiResponse: models['geoLocalization-response'],
                model: models.geoLocalization,
                endpoint: endpoints.geoLocalization.geoLocalizationByIP,
                collections: [
                    new request({
                        type: 'countries',
                        method: 'apiSearchCountry',
                        search:  {limit: 100},
                        apiResponse: models['api-response'],
                        model: models.country,
                        endpoint: endpoints.destinations.apiSearchCountry
                    })
                ]
            })).then(function(response){
                var endDate = new Date();
                endDate.setMonth(endDate.getMonth() + 1);
                res.cookie("vjf-geoLocation", JSON.stringify({id:response.data[0].id, iataCode:response.data[0].countries[0].iataCode}) , {httpOnly: false});
                deferred.resolve(getDomain(response.data[0].id, response.data[0].countries[0].iataCode));
            }, function(error){
                logger.error("locale-resolver:", error.extraInfo);
                deferred.resolve(domain);
            });

        }
    }


  function getDomain(idCountry, iataCode) {
    for (var i = 0; i < domains.length; i++) {
      var oDomain = domains[i];
        if(oDomain.country == iataCode){
            oDomain.countryId = idCountry;
            return domain = utils.clone(oDomain);
        }
    }
    return domain;
  }

  return deferred.promise;

};

module.exports = localeResolver;