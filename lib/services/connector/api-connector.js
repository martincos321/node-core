/**
 * Module dependencies.
 */
var _ = require('underscore');
var request = require('../../utils/request');
var utils = require('../../utils/utils');

var ApiConnector = function () {
  var defaultOptions = {
    json: true,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
      //'Content-Length': Buffer.byteLength(),

    },
    timeout: 10000
  };


  function get(params) {
    var newOptions = utils.clone(defaultOptions);
    _.extend(newOptions.headers, params.headers)
    return new request[params.endpoint.method](params, newOptions);
  }

  return{
    get: get
  }

};


module.exports = ApiConnector;