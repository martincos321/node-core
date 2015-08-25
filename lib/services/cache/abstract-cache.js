/**
 *
 * Abstract Cache
 * ------------------------
 * ------------------------
 *
 * Cache service for api requests
 *
 */

var Q = require('q');
var apiConnector = require('../connector/api-connector');
var CacheError = require('../../exceptions/cacheError');
var cache_manager = require('cache-manager');
var qs = require("querystring");
var custom_cache = [];
var utils = require('../../utils/utils');

var abstractCache = function () {
    var deferred = Q.defer();
  /**
   * get
   * ------------------------
   *
   * The cache arguments expected are:
   * - 1) **params**: Request options. The attributes are used to create the cache key, also contain the cache config for the current method.
   *
   */
  function get(params) {
    var backUpData = {};
    var oParam = utils.clone(params);
    custom_cache[params.type + ":" + params.method] = custom_cache[params.type + ":" + params.method] || cache_manager.caching(params.cache);
    var key = params.type + "_" + params.method + ":" + qs.stringify(params.search);

    var timestampStart = new Date();

    custom_cache[params.type + ":" + params.method].wrap(key, function (cache_callback) {
      apiConnector().get(oParam).then(function (data) {
        backUpData = utils.clone(data);
        cache_callback(null, data);
      }, handleError);
    }, function (err, data) {
      if (err) {
        logger.error("abstractCache [set]: "+ err, params);
        respond(backUpData);
      } else {
        var timestampEnd = new Date();
        var diff = (timestampEnd - timestampStart) / 1000;

        logger.info("Response [cached]: " + key + ' in: ' + diff+ " sec", params);
        respond(data);
      }
    });

    return deferred.promise;
  }

  //Functions
  function respond(data) {
    deferred.resolve(data);
  }

  function handleError(error) {
    deferred.reject(error);
  }

  return{
    get: get
  }
};

module.exports = abstractCache;
