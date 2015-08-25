/**
 * Middleware locale
 * ------------------------
 * ------------------------
 *
 * Created to send on request locale information like language and country of the user
 *
 */

var PHPUnserialize = require('php-unserialize');
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


var notificationInjector = function (req, res, next) {
  var notificationLastStatus = (req.cookies["vjr_ultimo_status"])? JSON.parse(unescape(req.cookies["vjr_ultimo_status"].split("}")[0]+"}")) : false; 

  if(req.userLogged && notificationLastStatus){
    //console.log(req.userLogged);
    
    var today = new Date;
    var formatedToday = today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    notificationLastStatus["pedidos_amistad"]   = (notificationLastStatus["pedidos_amistad"])? (notificationLastStatus["pedidos_amistad"].indexOf("Invalid") == -1)? notificationLastStatus["pedidos_amistad"] : formatedToday : formatedToday;
    notificationLastStatus["notificaciones"]    = (notificationLastStatus["notificaciones"])? (notificationLastStatus["notificaciones"].indexOf("Invalid") == -1)? notificationLastStatus["notificaciones"] : formatedToday : formatedToday;
    notificationLastStatus["recomendaciones"]   = (notificationLastStatus["recomendaciones"])? (notificationLastStatus["recomendaciones"].indexOf("Invalid") == -1)? notificationLastStatus["recomendaciones"] : formatedToday : formatedToday;
    notificationLastStatus["mensajes_privados"] = (notificationLastStatus["mensajes_privados"])? (notificationLastStatus["mensajes_privados"].indexOf("Invalid") == -1)? notificationLastStatus["mensajes_privados"] : formatedToday : formatedToday;

    var userParams = {
        type: 'notification',
        method: 'publicCounters',
        apiResponse: models['api-response'],
        model: models.counter,
        endpoint: endpoints.users.publicCounters,
        search: { 
          friendsDate: notificationLastStatus["pedidos_amistad"],
          notificationDate: notificationLastStatus["notificaciones"], 
          recommendationDate : notificationLastStatus["recomendaciones"], 
          messagesDate : notificationLastStatus["mensajes_privados"],
          uh: req.userLogged.uh, 
          userId: req.userLogged.id
        }
    };

    abstractFacade().get(new request(userParams, req)).then(function(response){

        var notificationsCounter = {
          sol: response.data[0].friendRequest.latest,
          mps: response.data[0].privateMessages.latest,
          not: response.data[0].notifications.latest,
          rec: response.data[0].recommendations.latest
        };
     
        res.cookie('vjr_notif_status', JSON.stringify(notificationsCounter),{path:"/"});

        logger.info("notification-middleware:Counters injections", " ");
        
        next();
    }, function(error){
        logger.error("notification-middleware:user logged injections", error.extraInfo);
        req.error = error;
        next();
    }); 

  }else{
    next();
  }
};

module.exports = notificationInjector;