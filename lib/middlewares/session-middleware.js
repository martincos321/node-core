/**
 * Middleware locale
 * ------------------------
 * ------------------------
 *
 * Created to send on request locale information like language and country of the user
 *
 */

var qs = require("querystring");
var _ = require('underscore');
var os = require('os');
//Services
var abstractFacade = require('../services/facade/abstract-facade');
//Models
var models = require('../models/models');
var request = models.request;
//Endpoints
var endpoints = require('../resources/end-points');


var sessionInjector = function (req, res, next) {
  var userhash = (req.cookies["NODESESSID"]) ? req.cookies["NODESESSID"] : false;
  
  if(userhash){

    var userParams = {
        type: 'user',
        method: 'publicCurrentUser',
        apiResponse: models['api-response'],
        model: function (data) {return data;},
        endpoint: endpoints.users.publicCurrentUser,
        primaryKey: 'uh',
        search: {uh: userhash}
    };

    abstractFacade().get(new request(userParams, req)).then(function(response){
        req.userLogged = response.data[0];
        req.userLogged.uh = userHash;
        logger.info("session-middleware:user logged injections", "User ["+req.userLogged.id+"] login");
        
        next();
    }, function(error){
        logger.error("session-middleware:user logged injections", error.extraInfo);
        next();
    }); 
  }else{
    next();
  }

};

module.exports = sessionInjector;