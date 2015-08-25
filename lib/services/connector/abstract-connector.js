var apiConnector = require('./api-connector');
var abstractCache = require('../cache/abstract-cache');
var _ = require('underscore');

var abstractConnector = function () {

  function get(connectorOptions) {
    var _connectorOptions = _.extend({}, connectorOptions);
    var type = _connectorOptions.type;
    var method = _connectorOptions.method;

    _connectorOptions.cache = (config.cache[type])? config.cache[type][method] : undefined;

      if (!_connectorOptions.cache) {
          return apiConnector().get(_connectorOptions);
      } else {
          return new abstractCache().get(_connectorOptions);
      }
  }

  return{
    get: get
  };
};

module.exports = abstractConnector;